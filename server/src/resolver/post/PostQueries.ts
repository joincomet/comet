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
import { ServerPermission } from '@/types/ServerPermission'
import { UserJoinServer } from '@/entity/UserJoinServer'
import { Auth } from '@/util/auth'

@Resolver(() => Post)
export class PostQueries {
  @Authorized(ServerPermission.ViewPosts)
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

    let servers = []
    if (joinedOnly) {
      const joins = await em.find(UserJoinServer, { user })
      servers = joins.map(join => join.server)
    }

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
          joinedOnly ? { server: servers } : {},
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

  @Authorized(ServerPermission.ViewPosts)
  @Query(() => Post)
  async getPost(
    @Arg('postId', () => ID) postId: string,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOneOrFail(Post, postId, ['server', 'author'])

    if (!post) return null

    if (
      !post.server.searchable &&
      !(await user.hasJoinedServer(em, post.server))
    )
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

  @Authorized(Auth.Admin)
  @Query(() => LinkMetadata)
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
