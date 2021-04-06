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
import { CheckPostServerPermission, CheckServerPermission } from '@/util'

@Resolver()
export class FolderMutations {
  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Boolean)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'creator',
      'server'
    ])
    if (folder.isDeleted) throw new Error('error.folder.deleted')
    if (folder.owner !== user) throw new Error('error.folder.notOwner')
    const post = await em.findOne(Post, postId)
    folder.posts.add(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Boolean)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const folder = await em.findOneOrFail(Folder, folderId, ['creator'])
    if (folder.isDeleted) throw new Error('error.folder.deleted')
    if (folder.owner !== user) throw new Error('error.folder.notOwner')
    const post = await em.findOne(Post, postId)
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
