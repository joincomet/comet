import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Folder, Post, Server, ServerFolder, UserFolder } from '@/entity'
import { handleUnderscore } from '@/util/text'
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

  @Authorized()
  @Mutation(() => Folder)
  async createUserFolder(
    @Arg('name') name: string,
    @Ctx() { user, em }: Context
  ): Promise<Folder> {
    if (name.length > 300) throw new Error('error.folder.nameTooLong')
    const folder = em.create(Folder, {
      owner: user,
      name
    })
    const userFolder = em.create(UserFolder, {
      user,
      folder
    })
    await em.persistAndFlush([folder, userFolder])
    return folder
  }

  @CheckServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Folder)
  async createServerFolder(
    @Arg('name') name: string,
    @Arg('serverId', () => ID) serverId: string,
    @Ctx() { user, em }: Context
  ): Promise<Folder> {
    if (name.length > 300) throw new Error('error.folder.nameTooLong')
    const server = await em.findOneOrFail(Server, serverId)
    const folder = em.create(Folder, {
      name
    })
    const serverFolder = em.create(ServerFolder, {
      server,
      folder
    })
    await em.persistAndFlush([folder, serverFolder])
    return folder
  }
}
