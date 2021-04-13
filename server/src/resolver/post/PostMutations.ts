import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Post } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import {
  createPost,
  CreatePostArgs,
  editPost,
  EditPostArgs,
  deletePost,
  votePost,
  unvotePost,
  pinPost,
  unpinPost
} from '@/resolver/post/mutations'
import { PostServerPayload } from '@/resolver/post/subscriptions'

@Resolver()
export class PostMutations {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Ctx() ctx: Context,
    @Args()
    args: CreatePostArgs,
    @PubSub(SubscriptionTopic.PostCreated)
    notifyPostCreated: Publisher<PostServerPayload>
  ): Promise<Post> {
    return createPost(ctx, args, notifyPostCreated)
  }

  @Authorized()
  @Mutation(() => Post)
  async editPost(
    @Ctx() ctx: Context,
    @Args() args: EditPostArgs,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return editPost(ctx, args, notifyPostUpdated)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID) postId: string,
    @PubSub(SubscriptionTopic.PostDeleted)
    notifyPostDeleted: Publisher<PostServerPayload>
  ): Promise<boolean> {
    return deletePost(ctx, postId, notifyPostDeleted)
  }

  @Authorized()
  @Mutation(() => Post)
  async votePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return votePost(ctx, postId, notifyPostUpdated)
  }

  @Authorized()
  @Mutation(() => Post)
  async unvotePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return unvotePost(ctx, postId, notifyPostUpdated)
  }

  @Authorized()
  @Mutation(() => Post)
  async pinPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return pinPost(ctx, postId, notifyPostUpdated)
  }

  @Authorized()
  @Mutation(() => Post)
  async unpinPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID)
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return unpinPost(ctx, postId, notifyPostUpdated)
  }
}
