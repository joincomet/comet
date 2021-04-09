import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, ServerPermission, SubscriptionTopic } from '@/types'
import {
  Folder,
  FolderPost,
  FriendData,
  Post,
  Server,
  ServerFolder,
  User,
  UserFolder
} from '@/entity'
import {
  CheckFolderServerPermission,
  CheckServerPermission,
  uploadImageSingle
} from '@/util'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { FolderVisibility } from '@/resolver/folder/types'
import { FriendStatus } from '@/resolver/user'
import { EntityManager } from '@mikro-orm/postgresql'

@Resolver()
export class FolderMutations {
  async checkCanModifyFolder(em: EntityManager, folder: Folder, user: User) {
    if (folder.owner) {
      if (folder.owner !== user && !folder.isCollaborative)
        throw new Error('error.folder.notCollaborative')
      if (
        folder.visibility === FolderVisibility.Private &&
        folder.owner !== user
      )
        throw new Error('error.folder.private')
      if (folder.visibility === FolderVisibility.Friends) {
        const friends = (
          await em.find(FriendData, { user, status: FriendStatus.Friends })
        ).map(f => f.toUser)
        if (!friends.includes(folder.owner))
          throw new Error('error.folder.notFriends')
      }
    } else {
      await user.checkServerPermission(
        em,
        folder.serverFolder.server,
        ServerPermission.AddPostToFolder
      )
    }
  }

  @Authorized()
  @Mutation(() => Folder)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<Folder> {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    const post = await em.findOneOrFail(Post, postId)
    if (folder.isDeleted) throw new Error('error.folder.deleted')

    await this.checkCanModifyFolder(em, folder, user)

    let folderPost = await em.findOne(FolderPost, { folder, post })
    if (folderPost) throw new Error('error.folder.alreadyAdded')

    folderPost = em.create(FolderPost, { folder, post, addedByUser: user })
    folder.updatedAt = new Date()
    folder.postCount++
    await em.persistAndFlush([folder, folderPost])
    return folder
  }

  @Authorized()
  @Mutation(() => Folder)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<Folder> {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    const post = await em.findOneOrFail(Post, postId)
    if (folder.isDeleted) throw new Error('error.folder.deleted')

    await this.checkCanModifyFolder(em, folder, user)

    const folderPost = await em.findOne(FolderPost, { folder, post })
    if (!folderPost) throw new Error('error.folder.notInFolder')

    folder.updatedAt = new Date()
    folder.postCount--
    await em.remove(folderPost).persistAndFlush(folder)
    return folder
  }

  @CheckServerPermission(ServerPermission.ManageFolders)
  @Mutation(() => Folder)
  async createFolder(
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUserFolders)
    refetchUserFolders: Publisher<string>,
    @PubSub(SubscriptionTopic.RefetchServerFolders)
    refetchServerFolders: Publisher<string>,
    @Arg('name') name: string,
    @Arg('isCollaborative', { defaultValue: false })
    isCollaborative: boolean = false,
    @Arg('visibility', () => FolderVisibility, {
      defaultValue: FolderVisibility.Public
    })
    visibility: FolderVisibility = FolderVisibility.Public,
    @Arg('serverId', () => ID, { nullable: true }) serverId?: string
  ): Promise<Folder> {
    if (name.length > 300) throw new Error('error.folder.nameTooLong')
    if (name === 'Favorites' || name === 'Read Later')
      throw new Error('error.folder.cannotCreate')
    let folder
    if (serverId) {
      const server = await em.findOneOrFail(Server, serverId)
      folder = em.create(Folder, {
        name,
        visibility
      })
      const serverFolder = em.create(ServerFolder, {
        server,
        folder
      })
      await em.persistAndFlush([folder, serverFolder])
      await refetchServerFolders(serverId)
    } else {
      folder = em.create(Folder, {
        owner: user,
        name,
        visibility,
        isCollaborative
      })
      const userFolder = em.create(UserFolder, {
        user,
        folder
      })
      await em.persistAndFlush([folder, userFolder])
      await refetchUserFolders(user.id)
    }
    return folder
  }

  @CheckFolderServerPermission(ServerPermission.ManageFolders)
  @Mutation(() => Folder)
  async updateFolder(
    @Ctx() { user, em }: Context,
    @Arg('folderId', () => ID) folderId: string,
    @Arg('avatarFile', () => GraphQLUpload, { nullable: true })
    avatarFile?: FileUpload,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('isCollaborative', { nullable: true }) isCollaborative?: boolean,
    @Arg('visibility', () => FolderVisibility, { nullable: true })
    visibility?: FolderVisibility
  ): Promise<Folder> {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'serverFolder.server',
      'owner'
    ])
    if (folder.name === 'Favorites' || folder.name === 'Read Later')
      throw new Error('error.folder.cannotEdit')
    em.assign(folder, {
      avatarUrl: avatarFile
        ? await uploadImageSingle(avatarFile, {
            width: 256,
            height: 256
          })
        : folder.avatarUrl,
      name: name ?? folder.name,
      description: description ?? folder.description,
      isCollaborative: isCollaborative ?? folder.isCollaborative,
      visibility: visibility ?? folder.visibility
    })
    if (visibility === FolderVisibility.Private) {
      await em.nativeDelete(UserFolder, { folder, user: { $ne: user } })
    } else if (visibility === FolderVisibility.Friends) {
      const friends = (
        await em.find(FriendData, { user, status: FriendStatus.Friends }, [
          'toUser'
        ])
      ).map(fd => fd.toUser)
      await em.nativeDelete(UserFolder, { folder, user: { $nin: friends } })
    }
    await em.persistAndFlush(folder)
    return folder
  }

  @CheckFolderServerPermission(ServerPermission.ManageFolders)
  @Mutation(() => Boolean)
  async deleteFolder(
    @Ctx() { user, em }: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.RefetchServerFolders)
    refetchServerFolders: Publisher<string>,
    @PubSub(SubscriptionTopic.RefetchUserFolders)
    refetchUserFolders: Publisher<string>
  ) {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    if (folder.name === 'Favorites' || folder.name === 'Read Later')
      throw new Error('error.folder.cannotDelete')
    if (folder.serverFolder) {
      const server = folder.serverFolder.server
      await user.checkServerPermission(em, server, ServerPermission.ManagePosts)
    }
    folder.isDeleted = true
    await em.nativeDelete(UserFolder, { folder })
    await em.nativeDelete(ServerFolder, { folder })
    await em.persistAndFlush(folder)
    if (folder.owner) await refetchUserFolders(user.id)
    else await refetchServerFolders(folder.serverFolder.server.id)
    return true
  }

  @Authorized()
  @Mutation(() => Folder)
  async followFolder(
    @Ctx() { em, user }: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.RefetchUserFolders)
    refetchUserFolders: Publisher<string>
  ): Promise<Folder> {
    const folder = await em.findOne(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    if (folder.owner === user) throw new Error('error.folder.owner')
    if (folder.visibility === FolderVisibility.Private)
      throw new Error('error.folder.private')
    if (folder.visibility === FolderVisibility.Friends) {
      const [myData, theirData] = await user.getFriendData(em, folder.owner.id)
      if (myData.status !== FriendStatus.Friends)
        throw new Error('error.folder.notFriends')
    }
    const userFolder = em.create(UserFolder, {
      user,
      folder
    })
    folder.followerCount++
    await em.persistAndFlush([userFolder, folder])
    await refetchUserFolders(user.id)
    return folder
  }

  @Authorized()
  @Mutation(() => Folder)
  async unfollowFolder(
    @Ctx() { em, user }: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.RefetchUserFolders)
    refetchUserFolders: Publisher<string>
  ): Promise<Folder> {
    const folder = await em.findOne(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    const userFolder = await em.findOneOrFail(UserFolder, { user, folder })
    folder.followerCount--
    await em.remove(userFolder).persistAndFlush([folder])
    await refetchUserFolders(user.id)
    return folder
  }
}
