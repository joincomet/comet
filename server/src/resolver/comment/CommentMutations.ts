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
import { Context, SubscriptionTopic } from '@/types'
import { Comment } from '@/entity'
import { CreateCommentArgs, createComment } from './mutations/createComment'
import { deleteComment } from './mutations/deleteComment'
import { editComment, EditCommentArgs } from './mutations/editComment'
import { voteComment } from './mutations/voteComment'
import { unvoteComment } from './mutations/unvoteComment'
import { PostCommentPayload } from '@/resolver/comment/subscriptions/PostCommentPayload'

@Resolver(() => Comment)
export class CommentMutations {
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Ctx() ctx: Context,
    @Args() args: CreateCommentArgs,
    @PubSub(SubscriptionTopic.CommentCreated)
    notifyCommentCreated: Publisher<PostCommentPayload>
  ): Promise<Comment> {
    return createComment(ctx, args, notifyCommentCreated)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(
    @Ctx() ctx: Context,
    @Arg('commentId', () => ID) commentId: string,
    @PubSub(SubscriptionTopic.CommentDeleted)
    notifyCommentDeleted: Publisher<PostCommentPayload>
  ) {
    return deleteComment(ctx, commentId, notifyCommentDeleted)
  }

  @Authorized()
  @Mutation(() => Comment)
  async editComment(
    @Ctx() ctx: Context,
    @Args() args: EditCommentArgs,
    @PubSub(SubscriptionTopic.CommentUpdated)
    notifyCommentUpdated: Publisher<{ commentId: string }>
  ): Promise<Comment> {
    return editComment(ctx, args, notifyCommentUpdated)
  }

  @Authorized()
  @Mutation(() => Comment, { description: 'Add vote to a comment' })
  async voteComment(
    @Ctx() ctx: Context,
    @Arg('commentId', () => ID, { description: 'ID of comment to vote' })
    commentId: string,
    @PubSub(SubscriptionTopic.CommentUpdated)
    notifyCommentUpdated: Publisher<{ commentId: string }>
  ): Promise<Comment> {
    return voteComment(ctx, commentId, notifyCommentUpdated)
  }

  @Authorized()
  @Mutation(() => Comment, { description: 'Remove vote from a comment' })
  async unvoteComment(
    @Ctx() ctx: Context,
    @Arg('commentId', () => ID, { description: 'ID of comment to remove vote' })
    commentId: string,
    @PubSub(SubscriptionTopic.CommentUpdated)
    notifyCommentUpdated: Publisher<{ commentId: string }>
  ): Promise<Comment> {
    return unvoteComment(ctx, commentId, notifyCommentUpdated)
  }
}
