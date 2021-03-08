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
import { Post, LinkMetadata, Server, Comment } from '@/entity'
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
import { ServerPermission } from '@/types/ServerPermission'
import { CommentVote } from '@/entity/CommentVote'
import { PostVote } from '@/entity/PostVote'
import { Auth } from '@/util/auth'

@Resolver()
export class PostMutations {
  @Authorized(ServerPermission.CreatePost)
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

  @Authorized(Auth.Author)
  @Mutation(() => Boolean)
  async updatePost(
    @Arg('postId', () => ID) postId: string,
    @Arg('text') text: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)

    text = handleText(text)
    if (!text) text = null

    post.text = text
    post.editedAt = new Date()

    await em.persistAndFlush(post)

    return true
  }

  @Authorized(Auth.Author)
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    post.deleted = true
    post.pinned = false
    await em.persistAndFlush(post)
    return true
  }

  @Authorized(ServerPermission.VotePost)
  @Mutation(() => Boolean)
  async votePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOneOrFail(Post, postId)
    let vote = await em.findOne(PostVote, { user, post })
    if (vote) throw new Error('You have already voted this post')
    vote = em.create(PostVote, { user, post })
    post.voteCount++
    await em.persistAndFlush([post, vote])
    return true
  }

  @Authorized(ServerPermission.VotePost)
  @Mutation(() => Boolean)
  async unvotePost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOneOrFail(Post, postId)
    const vote = await em.findOneOrFail(PostVote, { user, post })
    await em.remove(vote)
    post.voteCount--
    await em.persistAndFlush(post)
    return true
  }

  @Authorized(ServerPermission.ManagePosts)
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

  @Authorized(ServerPermission.ManagePosts)
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

  @Authorized(ServerPermission.ManagePosts)
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
