import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { Post, LinkMetadata, ServerUserJoin } from '@/entity'
import {
  GetPostsArgs,
  GetPostsTime,
  GetPostsSort,
  GetPostsResponse
} from '@/resolver/post'
import { Context } from '@/types'
import { scrapeMetadata, CheckServerPermission } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { ServerPermission } from '@/types'

@Resolver(() => Post)
export class PostQueries {
  @CheckServerPermission(ServerPermission.ViewPosts)
  @Query(() => GetPostsResponse, {
    description:
      'Get posts (requires ServerPermission.ViewPosts if serverId is provided)'
  })
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
    else if (sort === GetPostsSort.TOP) orderBy = { voteCount: QueryOrder.DESC }

    let servers = []
    if (joinedOnly) {
      const joins = await em.find(ServerUserJoin, { user })
      servers = joins.map(join => join.server)
    }

    const posts = await em.find(
      Post,
      {
        $and: [
          { isRemoved: false },
          { isDeleted: false },
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
      ['author', 'server', 'votes.user'],
      orderBy,
      pageSize,
      page * pageSize
    )

    posts.forEach(post => {
      post.isVoted = post.votes
        .getItems()
        .map(vote => vote.user)
        .includes(user)
    })

    return {
      page: page,
      nextPage: posts.length >= pageSize ? page + 1 : null,
      posts
    } as GetPostsResponse
  }

  @CheckServerPermission(ServerPermission.ViewPosts)
  @Query(() => Post, {
    description: 'Get a specific post (requires ServerPermission.ViewPosts)'
  })
  async getPost(
    @Arg('postId', () => ID, { description: 'ID of post to retrieve' })
    postId: string,
    @Ctx() { em }: Context
  ) {
    const post = await em.findOneOrFail(Post, postId, ['server', 'author'])

    if (post.isDeleted) {
      post.author = null
      post.text = '<p>[deleted]</p>'
    }

    if (post.isRemoved) {
      post.author = null
      post.text = `<p>[removed: ${post.removedReason}]</p>`
    }

    return post
  }

  @Authorized('ADMIN')
  @Query(() => LinkMetadata, {
    description: 'Get LinkMetadata for a URL (requires admin)',
    deprecationReason: 'For testing only'
  })
  async getUrlEmbed(@Arg('url') url: string) {
    return scrapeMetadata(url)
  }
}
