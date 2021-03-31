import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Folder, Post } from '@/entity'
import { handleUnderscore } from '@/util/text'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckPostServerPermission } from '@/util'

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
  @Mutation(() => Boolean)
  async createUserFolder(
    @Arg('name') name: string,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (name.length > 300) throw new Error('error.folder.nameTooLong')
    if (
      await em.findOne(Folder, {
        $and: [{ name: { $ilike: handleUnderscore(name) } }, { owner: user }]
      })
    )
      throw new Error('error.folder.alreadyExists')
    const folder = em.create(Folder, {
      owner: user,
      name
    })
    await em.persistAndFlush(folder)
    return true
  }
}
