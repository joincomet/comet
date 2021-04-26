import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { LinkMetadata, Post } from '@/entity'
import { Context } from '@/types'
import {
  createPost,
  CreatePostInput,
  updatePost,
  UpdatePostInput,
  deletePost,
  DeletePostInput,
  pinPost,
  PinPostInput,
  unpinPost,
  UnpinPostInput,
  votePost,
  VotePostInput,
  unvotePost,
  UnvotePostInput
} from './mutations'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { PostsArgs, posts, post, PostsResponse } from '@/resolver/post/queries'
import { scrapeMetadata } from '@/util'
import { IsUrl, MaxLength } from 'class-validator'

@ArgsType()
class GetLinkMetaArgs {
  @Field()
  @MaxLength(2000)
  @IsUrl()
  linkUrl: string
}

@Resolver(() => Post)
export class PostResolver {
  // --- Fields ---
  @FieldResolver()
  async isVoted(
    @Ctx() { loaders: { postVoteLoader } }: Context,
    @Root() post: Post
  ) {
    return postVoteLoader.load(post.id)
  }

  // --- Queries ---
  @Authorized()
  @Query(() => PostsResponse)
  async posts(
    @Ctx() ctx: Context,
    @Args()
    args: PostsArgs
  ): Promise<PostsResponse> {
    return posts(ctx, args)
  }

  @Authorized()
  @Query(() => Post)
  async post(
    @Ctx() ctx: Context,
    @Arg('id', () => ID)
    id: string
  ): Promise<Post> {
    return post(ctx, id)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: CreatePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return createPost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async updatePost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UpdatePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return updatePost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async deletePost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: DeletePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return deletePost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async votePost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: VotePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return votePost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async unvotePost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UnvotePostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return unvotePost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async pinPost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: PinPostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return pinPost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Mutation(() => Post)
  async unpinPost(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UnpinPostInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Post> {
    return unpinPost(ctx, input, notifyPostChanged)
  }

  @Authorized()
  @Query(() => LinkMetadata, { nullable: true })
  async getLinkMeta(
    @Ctx() ctx: Context,
    @Args() { linkUrl }: GetLinkMetaArgs
  ): Promise<LinkMetadata> {
    return scrapeMetadata(linkUrl.toString())
  }
}
