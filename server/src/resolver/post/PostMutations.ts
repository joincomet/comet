import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Post, LinkMetadata, Server } from '@/entity'
import {
  CreatePostArgs,
  GetPostsArgs,
  GetPostsTime,
  GetPostsSort,
  GetPostsResponse
} from '@/resolver/post'
import { Context } from '@/types'
import { uploadImage } from '@/util/s3'
import { scrapeMetadata } from '@/util/metascraper'
import { QueryOrder } from '@mikro-orm/core'
import { handleText } from '@/util/text'

@Resolver()
export class PostMutations {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Args()
    { title, linkUrl, text, serverId, images }: CreatePostArgs,
    @Ctx() { user, em }: Context
  ) {
    if (text) {
      text = handleText(text)
      if (!text) text = null
    }

    const server = await em.findOne(Server, serverId)

    if (server.bannedUsers.contains(user))
      throw new Error('You have been banned from ' + server.name)

    const imageUrls = []

    if (images && images.length > 0) {
      for (const image of images) {
        const { createReadStream, mimetype } = await image

        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
          throw new Error('Image must be PNG or JPEG')

        const imageUrl = await uploadImage(createReadStream(), mimetype)
        imageUrls.push(imageUrl)
      }
    }

    const post = em.create(Post, {
      title,
      linkUrl,
      author: user,
      server,
      linkMetadata: linkUrl ? await scrapeMetadata(linkUrl) : null,
      imageUrls,
      text: text,
      rocketers: [user],
      rocketCount: 1,
      isRocketed: true
    })

    await em.persistAndFlush(post)

    return post
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async editPost(
    @Arg('postId', () => ID) postId: string,
    @Arg('newText') newText: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['author'])
    if (post.author !== user)
      throw new Error('You must be the author to edit this post!')

    newText = handleText(newText)
    if (!newText) newText = null

    post.text = newText
    post.editedAt = new Date()

    await em.persistAndFlush(post)

    return true
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['author'])
    if (post.author !== user)
      throw new Error('You must be the author to delete this post!')
    post.deleted = true
    post.pinned = false
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    post.rocketers.add(user)
    post.rocketCount++
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    post.rocketers.remove(user)
    post.rocketCount--
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removePost(
    @Arg('postId', () => ID) postId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId)

    em.assign(post, {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinRank: null
    })
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async pinPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId)

    post.pinned = true
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unpinPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId)

    post.pinned = false
    await em.persistAndFlush(post)
    return true
  }
}
