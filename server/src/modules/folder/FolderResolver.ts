import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Context } from '@/types/Context'
import { Post } from '@/entity/Post'
import { Folder } from '@/entity/Folder'
import { handleUnderscore } from '@/util/handleUnderscore'
import { Server } from '@/entity/Server'

@Resolver()
export class FolderResolver {
  @Authorized()
  @Query(() => [Folder])
  async getServerFolders(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOne(Server, serverId, ['folders'])
    if (!server) throw new Error('Server not found')
    return server.folders
  }

  @Authorized()
  @Query(() => [Folder])
  async getUserFolders(@Ctx() { user, em }: Context) {
    await em.populate(user, 'folders')
    return user.folders
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ) {
    const folder = await em.findOne(Folder, folderId, ['creator', 'server'])
    if (!folder) throw new Error('Invalid folder')
    if (folder.deleted) throw new Error('Folder has been deleted')
    if (folder.owner !== user) throw new Error('You do not own this folder')
    const post = await em.findOne(Post, postId)
    folder.posts.add(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: string,
    @Arg('folderId', () => ID) folderId: string,
    @Ctx() { user, em }: Context
  ) {
    const folder = await em.findOne(Folder, folderId, ['creator'])
    if (!folder) throw new Error('Invalid folder')
    if (folder.deleted) throw new Error('Folder has been deleted')
    if (folder.owner !== user) throw new Error('You do not own this folder')
    const post = await em.findOne(Post, postId)
    folder.posts.remove(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createFolder(@Arg('name') name: string, @Ctx() { user, em }: Context) {
    if (name.length > 300)
      throw new Error('Name cannot be longer than 300 characters')
    if (
      await em.findOne(Folder, {
        $and: [{ name: { $ilike: handleUnderscore(name) } }, { owner: user }]
      })
    )
      throw new Error('You already have a folder with that name')
    const folder = em.create(Folder, {
      owner: user,
      name
    })
    await em.persistAndFlush(folder)
    return true
  }
}
