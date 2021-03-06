import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Post, LinkMetadata } from '@/entity'
import {
  GetPostsArgs,
  GetPostsTime,
  GetPostsSort,
  GetPostsResponse
} from '@/resolver/post'
import { Context } from '@/types'
import { scrapeMetadata } from '@/util/metascraper'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Post)
export class PostQueries {
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

  @Query(() => LinkMetadata)
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
