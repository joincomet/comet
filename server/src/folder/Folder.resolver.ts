import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { User } from '@/user/User.entity'
import { Context } from '@/Context'
import { Post } from '@/post/Post.entity'
import { Folder } from '@/folder/Folder.entity'
import { randomEnum } from '@/randomEnum'
import { Color } from '@/Color'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver()
export class FolderResolver {
  @Query(() => [Folder])
  async folders(@Ctx() { userId, em }: Context) {
    if (!userId) return []
    return em.find(Folder, { creator: userId, deleted: false })
  }

  @Query(() => Folder, { nullable: true })
  async folder(
    @Arg('folderId', () => ID) folderId: bigint,
    @Ctx() { em }: Context
  ) {
    return em.findOne(Folder, { id: folderId, deleted: false })
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addPostToFolder(
    @Arg('postId', () => ID) postId: bigint,
    @Arg('folderId', () => ID) folderId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const folder = await em.findOne(Folder, folderId, ['creator'])
    if (!folder) throw new Error('Invalid folder')
    if (folder.deleted) throw new Error('Folder has been deleted')
    if (folder.creator.id !== userId)
      throw new Error('You do not have permission to modify this folder')
    const post = await em.findOne(Post, postId)
    folder.posts.add(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removePostFromFolder(
    @Arg('postId', () => ID) postId: bigint,
    @Arg('folderId', () => ID) folderId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const folder = await em.findOne(Folder, folderId, ['creator'])
    if (!folder) throw new Error('Invalid folder')
    if (folder.deleted) throw new Error('Folder has been deleted')
    if (folder.creator.id !== userId)
      throw new Error('You do not have permission to modify this folder')
    const post = await em.findOne(Post, postId)
    folder.posts.remove(post)
    folder.updatedAt = new Date()
    await em.persistAndFlush(folder)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createFolder(
    @Arg('name') name: string,
    @Ctx() { userId, em }: Context
  ) {
    if (name.length > 300)
      throw new Error('Name cannot be longer than 300 characters')
    if (
      await em.findOne(Folder, {
        $and: [
          { name: { $ilike: handleUnderscore(name) } },
          { creator: userId }
        ]
      })
    )
      throw new Error('You already have a folder with that name')
    const folder = em.create(Folder, {
      creatorId: userId,
      name
    })
    await em.persistAndFlush(folder)
    return true
  }
}
