import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { LinkMetadata, Post } from '@/entity'
import { Context } from '@/types'
import { scrapeMetadata } from '@/util'
import {
  getPost,
  getPosts,
  GetPostsArgs,
  GetPostsResponse
} from '@/resolver/post/queries'

@Resolver(() => Post)
export class PostQueries {
  @Authorized()
  @Query(() => [GetPostsResponse])
  async getPosts(
    @Ctx() ctx: Context,
    @Args()
    args: GetPostsArgs
  ): Promise<GetPostsResponse[]> {
    return getPosts(ctx, args)
  }

  @Authorized()
  @Query(() => Post)
  async getPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
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
