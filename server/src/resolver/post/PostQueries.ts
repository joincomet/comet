import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
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
import dayjs from 'dayjs'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'

@Resolver(() => Post)
export class PostQueries {
  @CheckJoinedServer()
  @Query(() => [Post], {
    description:
      'Get posts (requires ServerPermission.ViewPosts if serverId is provided)'
  })
  async getPosts(
    @Args()
    { page, pageSize, sort, time, folderId, serverId }: GetPostsArgs,
    @Ctx() { user, em }: Context
  ) {
    let orderBy = {}
    if (sort === GetPostsSort.New) orderBy = { createdAt: QueryOrder.DESC }
    else if (sort === GetPostsSort.Hot) orderBy = { hotRank: QueryOrder.DESC }
    else if (sort === GetPostsSort.Top) orderBy = { voteCount: QueryOrder.DESC }

    const joinedOnly = !folderId && !serverId

    let servers = []
    if (joinedOnly) {
      const joins = await em.find(ServerUserJoin, { user }, ['server'])
      servers = joins
        .map(join => join.server)
        .filter(server => server.isPostsEnabled)
    }

    const posts = await em.find(
      Post,
      {
        $and: [
          { isRemoved: false },
          { isDeleted: false },
          !time || time === GetPostsTime.All
            ? {}
            : {
                createdAt: {
                  // @ts-ignore
                  $gt: dayjs().subtract(1, time.toLowerCase()).toDate()
                }
              },
          { server: { $ne: null } },
          joinedOnly ? { server: servers } : {},
          serverId ? { server: { id: serverId } } : {}
        ]
      },
      ['author', 'server', 'votes'],
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

    return posts
  }

  @CheckJoinedServer()
  @Query(() => Post, {
    description: 'Get a specific post (requires ServerPermission.ViewPosts)'
  })
  async getPost(
    @Arg('postId', () => ID, { description: 'ID of post to retrieve' })
    postId: string,
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOneOrFail(Post, postId, [
      'server',
      'author',
      'votes'
    ])

    if (post.isDeleted) {
      post.author = null
      post.text = '<p>[deleted]</p>'
    }

    if (post.isRemoved) {
      post.author = null
      post.text = `<p>[removed: ${post.removedReason}]</p>`
    }

    post.isVoted = post.votes
      .getItems()
      .map(vote => vote.user)
      .includes(user)

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
