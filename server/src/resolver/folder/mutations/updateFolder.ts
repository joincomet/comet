import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import {
  Folder,
  FolderPost,
  FolderVisibility,
  Post,
  Relationship,
  RelationshipStatus,
  ServerFolder,
  ServerPermission,
  UserFolder
} from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { getReorderPosition, ReorderUtils } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UpdateFolderInput {
  @Field(() => ID)
  folderId: string

  @Field({ nullable: true })
  @Length(1, 100)
  name?: string

  @Field({ nullable: true })
  isCollaborative?: boolean

  @Field({ nullable: true })
  isFollowing?: boolean

  @Field(() => ID, { nullable: true })
  beforeFolderId?: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => FolderVisibility, { nullable: true })
  visibility?: FolderVisibility

  @Field(() => ID, { nullable: true })
  addedPostId?: string

  @Field(() => ID, { nullable: true })
  removedPostId?: string
}

export async function updateFolder(
  { em, user, liveQueryStore }: Context,
  {
    folderId,
    name,
    isCollaborative,
    isDeleted,
    visibility,
    beforeFolderId,
    isFollowing,
    addedPostId,
    removedPostId
  }: UpdateFolderInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, ['server', 'owner'])

  if (name || isCollaborative || isDeleted || visibility) {
    if (folder.server)
      await user.checkServerPermission(
        em,
        folder.server.id,
        ServerPermission.ManageFolders
      )
    else if (folder.owner) {
      if (folder.owner !== user)
        throw new Error('You must be the owner to edit this folder')
    }
    em.assign(folder, {
      name: name ?? folder.name,
      isCollaborative: isCollaborative ?? folder.isCollaborative,
      isDeleted,
      visibility: visibility ?? folder.visibility
    })
  }

  // Reorder folders
  if (typeof beforeFolderId === 'string') {
    if (folder.server) {
      // Server folder
      const serverFolders = await em.find(
        ServerFolder,
        { server: folder.server.id },
        ['folder'],
        {
          position: 'ASC'
        }
      )
      const serverFolder = serverFolders.find(f => f.folder.id === folderId)
      const firstServerFolder = serverFolders[0]
      const beforeServerFolder =
        beforeFolderId !== '0'
          ? serverFolders.find(f => f.folder.id === beforeFolderId)
          : null
      const afterServerFolder = beforeServerFolder
        ? serverFolders[serverFolders.indexOf(beforeServerFolder) + 1]
        : null
      serverFolder.position = getReorderPosition(
        firstServerFolder?.position,
        beforeServerFolder?.position,
        afterServerFolder?.position
      )
      em.persist(serverFolder)
    } else {
      // User folder
      const userFolders = await em.find(UserFolder, { user }, ['folder'], {
        position: QueryOrder.ASC
      })
      const userFolder = userFolders.find(f => f.folder.id === folderId)

      const firstUserFolder = userFolders[0]
      const beforeUserFolder =
        beforeFolderId !== '0'
          ? userFolders.find(f => f.folder.id === beforeFolderId)
          : null
      const afterUserFolder = beforeUserFolder
        ? userFolders[userFolders.indexOf(beforeUserFolder) + 1]
        : null

      userFolder.position = getReorderPosition(
        firstUserFolder?.position,
        beforeUserFolder?.position,
        afterUserFolder?.position
      )
      em.persist(userFolder)
    }
  }

  if (isFollowing != null) {
    if (folder.owner === user) throw new Error('Cannot follow your own folder')
    if (folder.server) await user.checkJoinedServer(em, folder.server.id)

    let userFolder = await em.findOne(UserFolder, { user, folder })

    if (isFollowing) {
      if (userFolder) throw new Error('Already following this folder')

      if (folder.owner) {
        if (folder.visibility === FolderVisibility.Private)
          throw new Error('That folder is private')
        if (folder.visibility === FolderVisibility.Friends) {
          const relationship = await em.findOne(Relationship, {
            owner: user,
            user: folder.owner
          })
          if (relationship?.status !== RelationshipStatus.Friends)
            throw new Error('That folder is visible to friends only')
        }
      } else if (folder.server) {
        await user.checkJoinedServer(em, folder.server.id)
      }

      const firstFolder = await em.findOne(UserFolder, { user })
      userFolder = em.create(UserFolder, {
        user,
        folder,
        position: firstFolder
          ? ReorderUtils.positionBefore(firstFolder.position)
          : ReorderUtils.FIRST_POSITION
      })
      em.persist(userFolder)
      folder.followerCount++
    } else {
      if (!userFolder) throw new Error('Not following that folder')
      em.remove(userFolder)
      folder.followerCount--
    }
  }

  if (removedPostId || addedPostId) {
    if (folder.owner && folder.owner !== user) {
      if (!folder.isCollaborative)
        throw new Error('That folder is not collaborative')
      if (folder.visibility === FolderVisibility.Private)
        throw new Error('That folder is private')
      if (folder.visibility === FolderVisibility.Friends) {
        const relationship = await em.findOne(Relationship, {
          owner: user,
          user: folder.owner
        })
        if (relationship?.status !== RelationshipStatus.Friends)
          throw new Error('That folder is visible to friends only')
      }
    } else if (folder.server) {
      await user.checkServerPermission(
        em,
        folder.server.id,
        ServerPermission.AddPostToFolder
      )
    }

    if (removedPostId || addedPostId) {
      const post = await em.findOneOrFail(Post, removedPostId ?? addedPostId)
      let folderPost = await em.findOne(FolderPost, { folder, post })
      if (addedPostId) {
        if (folderPost) throw new Error('error.folder.alreadyAdded')
        folderPost = em.create(FolderPost, { folder, post, addedByUser: user })
        folder.postCount++
        await em.persistAndFlush(folderPost)
        await notifyPostChanged({ id: post.id, type: ChangeType.Added })
      }
      if (removedPostId) {
        folder.postCount--
        await em.remove(folderPost).flush()
        await notifyPostChanged({ id: post.id, type: ChangeType.Deleted })
      }
    }
  }
  await em.persistAndFlush(folder)
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return folder
}
