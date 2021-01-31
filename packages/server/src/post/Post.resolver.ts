import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Post } from '@/post/Post.entity'
import { SubmitPostArgs } from '@/post/SubmitPostArgs'
import { Context } from '@/Context'
import { PostsArgs } from '@/post/PostsArgs'
import { User } from '@/user/User.entity'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { uploadImage } from '@/S3Storage'
import { TimeFilter } from '@/TimeFilter'
import { PostSort } from '@/post/PostSort'
import { PostsResponse } from '@/post/PostsResponse'
import { Metadata } from '@/metascraper/Metadata'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import { handleUnderscore } from '@/handleUnderscore'
import { QueryOrder } from '@mikro-orm/core'
import { base36ToBigInt } from '@/base36ToBigInt'
import { Planet } from '@/planet/Planet.entity'
import { handleText } from '@/handleText'

@Resolver(() => Post)
export class PostResolver {
  @Query(() => PostsResponse)
  async posts(
    @Args()
    { page, pageSize, sort, time, joinedOnly, folderId, planet }: PostsArgs,
    @Ctx() { userId, em }: Context
  ) {
    const user = userId ? await em.findOne(User, userId) : null

    let orderBy = {}
    if (sort === PostSort.NEW) orderBy = { createdAt: QueryOrder.DESC }
    else if (sort === PostSort.HOT) orderBy = { hotRank: QueryOrder.DESC }
    else if (sort === PostSort.TOP) orderBy = { rocketCount: QueryOrder.DESC }

    let interval = 'NOW() - INTERVAL 1 ' + time.toString().toLowerCase()
    if (!time || time === TimeFilter.ALL) interval = '0'

    const posts = await em.find(
      Post,
      {
        $and: [
          { removed: false },
          { deleted: false },
          { createdAt: { $gt: interval } },
          { planet: { $ne: null } },
          user ? { planet: user.joinedPlanets.getItems(false) } : {},
          planet
            ? { planet: { name: { $ilike: handleUnderscore(planet) } } }
            : {}
        ]
      },
      ['author', 'planet'],
      orderBy,
      pageSize,
      page * pageSize
    )

    return {
      page: page,
      nextPage: posts.length >= pageSize ? page + 1 : null,
      posts
    } as PostsResponse
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg('postId36', () => ID) postId36: string,
    @Ctx() { userId, em }: Context
  ) {
    if (!postId36) throw new Error('postId36 cannot be empty')

    const postId = base36ToBigInt(postId36)

    const post = await em.findOne(Post, postId, ['planet', 'author'])

    if (!post) return null

    if (post.planet.private && post.planet.users.contains(userId, false))
      throw new Error(
        'This post is in a private planet that you have not joined!'
      )

    if (post.deleted) {
      post.author = null
      post.textContent = '<p>[deleted]</p>'
    }

    if (post.removed) {
      post.author = null
      post.textContent = `<p>[removed: ${post.removedReason}]</p>`
    }

    return post
  }

  @Authorized()
  @Mutation(() => Post)
  async submitPost(
    @Args()
    { title, linkUrl, textContent, planetId, images }: SubmitPostArgs,
    @Ctx() { userId, em }: Context
  ) {
    if (textContent) {
      textContent = handleText(textContent)
      if (!textContent) textContent = null
    }

    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId)

    if (planet.bannedUsers.contains(user))
      throw new Error('You have been banned from ' + planet.name)

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
      planet,
      meta: linkUrl ? await scrapeMetadata(linkUrl) : null,
      imageUrls,
      textContent,
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
    @Arg('postId', () => ID) postId: bigint,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['author'])
    if (post.author.id !== userId)
      throw new Error('You must be the author to edit this post!')

    newTextContent = handleText(newTextContent)
    if (!newTextContent) newTextContent = null

    post.textContent = newTextContent
    post.editedAt = new Date()

    await em.persistAndFlush(post)

    return true
  }

  @Authorized('AUTHOR')
  @Mutation(() => Boolean)
  async deletePost(
    @Arg('postId', () => ID) postId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['author'])
    if (post.author.id !== userId)
      throw new Error('You must be the author to delete this post!')
    post.deleted = true
    post.pinned = false
    await em.persistAndFlush(post)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketPost(
    @Arg('postId', () => ID) postId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    const user = await em.findOne(User, userId)
    post.rocketers.add(user)
    post.rocketCount++
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketPost(
    @Arg('postId', () => ID) postId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    const user = await em.findOne(User, userId)
    post.rocketers.remove(user)
    post.rocketCount--
    return true
  }

  @Query(() => Metadata)
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
