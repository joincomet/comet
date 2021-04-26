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
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { Max, Min } from 'class-validator'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import dayjs from 'dayjs'
import { GraphQLNonNegativeInt, GraphQLPositiveInt } from 'graphql-scalars'

@ArgsType()
export class PostsArgs {
  @Field(() => GraphQLNonNegativeInt, { defaultValue: 0 })
  @Min(0)
  offset: number = 0

  @Field(() => GraphQLPositiveInt, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  limit: number = 20

  @Field(() => PostsSort, {
    defaultValue: 'Hot'
  })
  sort: PostsSort = PostsSort.Hot

  @Field(() => PostsTime, {
    defaultValue: 'All'
  })
  time: PostsTime = PostsTime.All

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

export enum PostsSort {
  New = 'New',
  Top = 'Top',
  Hot = 'Hot',
  Added = 'Added'
}

registerEnumType(PostsSort, {
  name: 'PostsSort'
})

export enum PostsTime {
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
  All = 'All'
}

registerEnumType(PostsTime, {
  name: 'PostsTime'
})

@ObjectType()
export class PostsResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Post])
  posts: Post[]
}

export async function posts(
  { em, userId }: Context,
  { offset, limit, sort, time, folderId, serverId, search }: PostsArgs
): Promise<PostsResponse> {
  const user = await em.findOneOrFail(User, userId)
  let orderBy = {}
  if (sort === PostsSort.New) orderBy = { createdAt: QueryOrder.DESC }
  else if (sort === PostsSort.Hot) orderBy = { hotRank: QueryOrder.DESC }
  else if (sort === PostsSort.Top) orderBy = { voteCount: QueryOrder.DESC }

  const joinedOnly = !folderId && !serverId
  let server
  if (serverId) {
    await user.checkJoinedServer(em, serverId)
    server = await em.findOneOrFail(Server, serverId)
  }

  let servers = []
  if (joinedOnly) {
    const serverJoins = await em.find(
      ServerUser,
      { user, status: ServerUserStatus.Joined },
      ['server']
    )
    servers = serverJoins.map(join => join.server)
  }
  let folder
  if (folderId) {
    folder = await em.findOneOrFail(Folder, folderId, ['owner'])
    if (!sort || sort === PostsSort.Added)
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
        !time || time === PostsTime.All || folder
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
    ['author.roles', 'author.user', 'server'],
    orderBy,
    limit + 1,
    offset
  )
  const hasMore = posts.length > limit
  return {
    hasMore,
    posts: hasMore ? posts.slice(0, limit) : posts
  } as PostsResponse
}
