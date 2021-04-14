import {
  ArgsType,
  Field,
  ID,
  Int,
  ObjectType,
  registerEnumType
} from 'type-graphql'
import {
  Folder,
  FolderVisibility,
  Post,
  RelationshipStatus,
  Server,
  ServerUser
} from '@/entity'
import { Max, Min } from 'class-validator'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import dayjs from 'dayjs'

@ArgsType()
export class GetPostsArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  page: number = 0

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  pageSize: number = 20

  @Field(() => GetPostsSort, {
    defaultValue: 'Hot'
  })
  sort: GetPostsSort = GetPostsSort.Hot

  @Field(() => GetPostsTime, {
    defaultValue: 'All'
  })
  time: GetPostsTime = GetPostsTime.All

  @Field(() => ID, {
    nullable: true
  })
  serverId?: string

  @Field(() => ID, {
    nullable: true
  })
  folderId?: string

  @Field({
    nullable: true
  })
  search?: string
}

export enum GetPostsSort {
  New = 'New',
  Top = 'Top',
  Hot = 'Hot',
  Added = 'Added'
}

registerEnumType(GetPostsSort, {
  name: 'GetPostsSort'
})

export enum GetPostsTime {
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
  All = 'All'
}

registerEnumType(GetPostsTime, {
  name: 'GetPostsTime'
})

@ObjectType()
export class GetPostsResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Post])
  posts: Post[]
}

export async function getPosts(
  { em, user }: Context,
  { page, pageSize, sort, time, folderId, serverId, search }: GetPostsArgs
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
    const serverJoins = await em.find(ServerUser, { user }, ['server'])
    servers = serverJoins.map(join => join.server)
  }
  let folder
  if (folderId) {
    folder = await em.findOneOrFail(Folder, folderId, ['owner'])
    if (!sort || sort === GetPostsSort.Added)
      orderBy = { folderPosts: { addedAt: QueryOrder.DESC } }
    if (folder.visibility === FolderVisibility.Private && folder.owner !== user)
      throw new Error('error.folder.private')
    if (
      folder.visibility === FolderVisibility.Friends &&
      folder.owner !== user
    ) {
      const [myData] = await user.getFriendData(em, folder.owner.id)
      if (myData.status !== RelationshipStatus.Friends)
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
    [
      'author',
      'serverUser.roles',
      'server',
      'votes',
      'folderPosts.addedByUser'
    ],
    orderBy,
    pageSize + 1, // get one extra to determine hasMore
    page * pageSize
  )

  posts.forEach(post => {
    post.isVoted = post.votes
      .getItems()
      .map(vote => vote.user)
      .includes(user)
    if (folder) {
      const folderPost = post.folderPosts
        .getItems()
        .find(fp => fp.folder === folder)
      post.addedByUser = folderPost.addedByUser
      post.addedAt = folderPost.addedAt
    }
  })

  const hasMore = posts.length > pageSize
  return [
    {
      hasMore,
      posts: hasMore ? posts.slice(0, posts.length - 1) : posts
    }
  ]
}
