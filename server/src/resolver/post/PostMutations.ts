import {
  Arg,
  Args,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Post, PostVote } from '@/entity'
import { Context, ServerPermission, SubscriptionTopic } from '@/types'
import {
  CheckPostAuthor,
  CheckPostServerPermission,
  CheckServerPermission
} from '@/util'
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
  @CheckServerPermission(ServerPermission.CreatePost)
  @Mutation(() => Post, {
    description:
      'Create a post in a server (requires ServerPermission.CreatePost)'
  })
  async createPost(
    @Ctx() ctx: Context,
    @Args()
    args: CreatePostArgs,
    @PubSub(SubscriptionTopic.PostCreated)
    notifyPostCreated: Publisher<PostServerPayload>
  ): Promise<Post> {
    return createPost(ctx, args, notifyPostCreated)
  }

  @CheckPostAuthor()
  @Mutation(() => Post, {
    description: 'Edit a post (must be author)'
  })
  async editPost(
    @Ctx() ctx: Context,
    @Args() args: EditPostArgs,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return editPost(ctx, args, notifyPostUpdated)
  }

  @CheckPostAuthor()
  @Mutation(() => Boolean, {
    description: 'Delete a post (must be author)'
  })
  async deletePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID) postId: string,
    @PubSub(SubscriptionTopic.PostDeleted)
    notifyPostDeleted: Publisher<PostServerPayload>
  ): Promise<boolean> {
    return deletePost(ctx, postId, notifyPostDeleted)
  }

  @CheckPostServerPermission(ServerPermission.VotePost)
  @Mutation(() => Post, { description: 'Add vote to post' })
  async votePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID, {
      description: 'ID of post to vote (requires ServerPermission.VotePost)'
    })
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return votePost(ctx, postId, notifyPostUpdated)
  }

  @CheckPostServerPermission(ServerPermission.VotePost)
  @Mutation(() => Post, { description: 'Remove vote from post' })
  async unvotePost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID, {
      description:
        'ID of post to remove vote (requires ServerPermission.VotePost)'
    })
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return unvotePost(ctx, postId, notifyPostUpdated)
  }

  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Post, {
    description: 'Pin a post (requires ServerPermission.PinPosts)'
  })
  async pinPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID, { description: 'ID of post to pin' })
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return pinPost(ctx, postId, notifyPostUpdated)
  }

  @CheckPostServerPermission(ServerPermission.ManagePosts)
  @Mutation(() => Post, {
    description: 'Unpin a post (requires ServerPermission.PinPosts)'
  })
  async unpinPost(
    @Ctx() ctx: Context,
    @Arg('postId', () => ID, { description: 'ID of post to unpin' })
    postId: string,
    @PubSub(SubscriptionTopic.PostUpdated)
    notifyPostUpdated: Publisher<{ postId: string }>
  ): Promise<Post> {
    return unpinPost(ctx, postId, notifyPostUpdated)
  }
}
