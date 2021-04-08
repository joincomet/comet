import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Folder, LinkMetadata, Post, Server, ServerUserJoin } from '@/entity'
import {
  GetPostsArgs,
  GetPostsResponse,
  GetPostsSort,
  GetPostsTime
} from '@/resolver/post'
import { Context } from '@/types'
import { scrapeMetadata } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import dayjs from 'dayjs'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { FolderVisibility } from '@/resolver/folder'
import { FriendStatus } from '@/resolver/user'

@Resolver(() => Post)
export class PostQueries {
  @CheckJoinedServer()
  @Query(() => [GetPostsResponse], {
    description:
      'Get posts (requires ServerPermission.ViewPosts if serverId is provided)'
  })
  async getPosts(
    @Args()
    { page, pageSize, sort, time, folderId, serverId }: GetPostsArgs,
    @Ctx() { user, em }: Context
  ): Promise<GetPostsResponse[]> {
    let orderBy = {}
    if (sort === GetPostsSort.New) orderBy = { createdAt: QueryOrder.DESC }
    else if (sort === GetPostsSort.Hot) orderBy = { hotRank: QueryOrder.DESC }
    else if (sort === GetPostsSort.Top) orderBy = { voteCount: QueryOrder.DESC }

    const joinedOnly = !folderId && !serverId
    let server
    if (serverId) server = await em.findOneOrFail(Server, serverId)

    let servers = []
    if (joinedOnly) {
      const joins = await em.find(ServerUserJoin, { user }, ['server'])
      servers = joins
        .map(join => join.server)
        .filter(server => server.isPostsEnabled)
    }
    let folder
    if (folderId) {
      folder = await em.findOneOrFail(Folder, folderId, ['owner'])
      if (!sort || sort === GetPostsSort.Added)
        orderBy = { folderPosts: { addedAt: QueryOrder.DESC } }
      if (
        folder.visibility === FolderVisibility.Private &&
        folder.owner !== user
      )
        throw new Error('error.folder.private')
      if (
        folder.visibility === FolderVisibility.Friends &&
        folder.owner !== user
      ) {
        const [myData] = await user.getFriendData(em, folder.owner.id)
        if (myData.status !== FriendStatus.Friends)
          throw new Error('error.folder.friends')
      }
    }

    const posts = await em.find(
      Post,
      {
        $and: [
          { isDeleted: false },
          !time || time === GetPostsTime.All || folder
            ? {}
            : {
                createdAt: {
                  // @ts-ignore
                  $gt: dayjs().subtract(1, time.toLowerCase()).toDate()
                }
              },
          { server: { $ne: null } },
          joinedOnly ? { server: servers } : {},
          server ? { server } : {},
          folder ? { folderPosts: { folder } } : {}
        ]
      },
      ['author', 'server.userJoins.user', 'votes'],
      orderBy,
      pageSize + 1, // get one extra to determine hasMore
      page * pageSize
    )

    posts.forEach(post => {
      post.isVoted = post.votes
        .getItems()
        .map(vote => vote.user)
        .includes(user)
      post.server.onlineUserCount = post.server.userJoins
        .getItems()
        .map(j => j.user)
        .filter(u => u.isOnline).length
    })

    const hasMore = posts.length > pageSize
    return [
      {
        hasMore,
        posts: hasMore ? posts.slice(0, posts.length - 1) : posts
      }
    ]
  }

  @CheckJoinedServer()
  @Query(() => Post, {
    description: 'Get a specific post (requires ServerPermission.ViewPosts)'
  })
  async getPost(
    @Arg('postId', () => ID, { description: 'ID of post to retrieve' })
    postId: string,
    @Ctx() { em, user }: Context
  ): Promise<Post> {
    const post = await em.findOneOrFail(Post, postId, [
      'server',
      'author',
      'votes'
    ])

    if (post.isDeleted) {
      post.author = null
      post.text = '<p>[deleted]</p>'
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
  async getUrlEmbed(@Arg('url') url: string): Promise<LinkMetadata> {
    return scrapeMetadata(url)
  }
}
