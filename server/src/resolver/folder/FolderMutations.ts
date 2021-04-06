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
import { Context, SubscriptionTopic } from '@/types'
import { Folder, Post, Server, ServerFolder, UserFolder } from '@/entity'
import { ServerPermission } from '@/types/ServerPermission'
import {
  CheckFolderServerPermission,
  CheckPostServerPermission,
  CheckServerPermission
} from '@/util'

@Resolver()
export class FolderMutations {
  @CheckFolderServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Boolean)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const folder = await em.findOneOrFail(Folder, folderId, ['posts'])
    const post = await em.findOneOrFail(Post, postId)
    if (folder.isDeleted) throw new Error('error.folder.deleted')
    if (folder.posts.contains(post))
      throw new Error('error.folder.alreadyAdded')
    folder.posts.add(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @CheckFolderServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Boolean)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const folder = await em.findOneOrFail(Folder, folderId)
    const post = await em.findOneOrFail(Post, postId)
    if (folder.isDeleted) throw new Error('error.folder.deleted')
    folder.posts.remove(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @CheckServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Folder)
  async createFolder(
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.RefetchUserFolders)
    refetchUserFolders: Publisher<string>,
    @PubSub(SubscriptionTopic.RefetchServerFolders)
    refetchServerFolders: Publisher<string>,
    @Arg('name') name: string,
    @Arg('serverId', () => ID, { nullable: true }) serverId?: string
  ): Promise<Folder> {
    if (name.length > 300) throw new Error('error.folder.nameTooLong')
    let folder
    if (serverId) {
      const server = await em.findOneOrFail(Server, serverId)
      folder = em.create(Folder, {
        name
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
        name
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
}
