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
import { Post } from '@/entity/Post'
import { CreatePostArgs } from '@/modules/post/types/CreatePostArgs'
import { Context } from '@/types/Context'
import { GetPostsArgs } from '@/modules/post/types/GetPostsArgs'
import { User } from '@/entity/User'
import { uploadImage } from '@/util/s3Storage'
import { GetPostsTime } from '@/modules/post/types/GetPostsTime'
import { GetPostsSort } from '@/modules/post/types/GetPostsSort'
import { GetPostsResponse } from '@/modules/post/types/GetPostsResponse'
import { LinkEmbed } from '@/entity/LinkEmbed'
import { scrapeMetadata } from '@/util/metascraper/scrapeMetadata'
import { QueryOrder } from '@mikro-orm/core'
import { Server } from '@/entity/Server'
import { handleText } from '@/util/xss/handleText'

@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Query(() => GetPostsResponse)
  async getPosts(
    @Args()
    {
      page,
      pageSize,
      sort,
      time,
      joinedOnly,
      folderId,
      serverId
    }: GetPostsArgs,
    @Ctx() { user, em }: Context
  ) {
    let orderBy = {}
    if (sort === GetPostsSort.NEW) orderBy = { createdAt: QueryOrder.DESC }
    else if (sort === GetPostsSort.HOT) orderBy = { hotRank: QueryOrder.DESC }
    else if (sort === GetPostsSort.TOP)
      orderBy = { rocketCount: QueryOrder.DESC }

    const posts = await em.find(
      Post,
      {
        $and: [
          { removed: false },
          { deleted: false },
          !time || time === GetPostsTime.ALL
            ? {}
            : {
                createdAt: {
                  $gt: 'NOW() - INTERVAL 1 ' + time.toString().toLowerCase()
                }
              },
          { server: { $ne: null } },
          user ? { server: user.servers.getItems(false) } : {},
          serverId ? { server: { id: serverId } } : {}
        ]
      },
      ['author', 'server'],
      orderBy,
      pageSize,
      page * pageSize
    )

    return {
      page: page,
      nextPage: posts.length >= pageSize ? page + 1 : null,
      posts
    } as GetPostsResponse
  }

  @Query(() => Post, { nullable: true })
  async getPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId, ['server', 'author'])

    if (!post) return null

    await em.populate(user, ['servers'])

    if (post.server.private && !user.servers.contains(post.server))
      throw new Error(
        'This post is in a private server that you have not joined!'
      )

    if (post.deleted) {
      post.author = null
      post.text = '<p>[deleted]</p>'
    }

    if (post.removed) {
      post.author = null
      post.text = `<p>[removed: ${post.removedReason}]</p>`
    }

    return post
  }

  @Authorized()
  @Mutation(() => Post)
  async submitPost(
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
      linkEmbed: linkUrl ? await scrapeMetadata(linkUrl) : null,
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

  @Query(() => LinkEmbed)
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
