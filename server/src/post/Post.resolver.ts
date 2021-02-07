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
import { Post } from '@/post/Post.entity'
import { SubmitPostArgs } from '@/post/SubmitPostArgs'
import { Context } from '@/Context'
import { PostsArgs } from '@/post/PostsArgs'
import { User } from '@/user/User.entity'
import { uploadImage } from '@/S3Storage'
import { TimeFilter } from '@/TimeFilter'
import { PostSort } from '@/post/PostSort'
import { PostsResponse } from '@/post/PostsResponse'
import { Metadata } from '@/metascraper/Metadata.entity'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import { handleUnderscore } from '@/handleUnderscore'
import { QueryOrder } from '@mikro-orm/core'
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

    const posts = await em.find(
      Post,
      {
        $and: [
          { removed: false },
          { deleted: false },
          !time || time === TimeFilter.ALL
            ? {}
            : {
                createdAt: {
                  $gt: 'NOW() - INTERVAL 1 ' + time.toString().toLowerCase()
                }
              },
          { planet: { $ne: null } },
          user ? { planet: user.planets.getItems(false) } : {},
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
    @Arg('postId', () => ID) postId: string,
    @Ctx() { userId, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['planet', 'author'])

    if (!post) return null

    const user = await em.findOne(User, userId, ['planets'])

    if (post.planet.private && !user.planets.contains(post.planet))
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
    @Arg('postId', () => ID) postId: string,
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
    @Arg('postId', () => ID) postId: string,
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
    @Arg('postId', () => ID) postId: string,
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
    @Arg('postId', () => ID) postId: string,
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
