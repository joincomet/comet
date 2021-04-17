import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver
} from 'type-graphql'
import { Post } from '@/entity'
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
import { PostsArgs, PostsResponse, posts, post } from '@/resolver/post/queries'

@Resolver(() => Post)
export class PostResolver {
  // --- Queries ---
  @Authorized()
  @Query(() => [PostsResponse])
  async posts(
    @Ctx() ctx: Context,
    @Args()
    args: PostsArgs
  ): Promise<PostsResponse[]> {
    return posts(ctx, args)
  }

  @Authorized()
  @Query(() => Post)
  async post(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
    postId: string
  ): Promise<Post> {
    return post(ctx, postId)
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
}
