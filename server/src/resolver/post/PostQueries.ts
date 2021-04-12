import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { LinkMetadata, Post } from '@/entity'
import { Context } from '@/types'
import { scrapeMetadata } from '@/util'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import {
  GetPostsArgs,
  GetPostsResponse,
  getPost,
  getPosts
} from '@/resolver/post/queries'

@Resolver(() => Post)
export class PostQueries {
  @CheckJoinedServer()
  @Query(() => [GetPostsResponse], {
    description:
      'Get posts (requires ServerPermission.ViewPosts if serverId is provided)'
  })
  async getPosts(
    @Ctx() ctx: Context,
    @Args()
    args: GetPostsArgs
  ): Promise<GetPostsResponse[]> {
    return getPosts(ctx, args)
  }

  @CheckJoinedServer()
  @Query(() => Post, {
    description: 'Get a specific post (requires ServerPermission.ViewPosts)'
  })
  async getPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID, { description: 'ID of post to retrieve' })
    postId: string
  ): Promise<Post> {
    return getPost(ctx, postId)
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
