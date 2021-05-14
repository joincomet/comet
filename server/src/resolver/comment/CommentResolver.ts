import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { Comment } from '@/entity'
import {
  createComment,
  CreateCommentInput,
  updateComment,
  UpdateCommentInput,
  deleteComment,
  DeleteCommentInput,
  pinComment,
  PinCommentInput,
  unpinComment,
  UnpinCommentInput,
  voteComment,
  VoteCommentInput,
  unvoteComment,
  UnvoteCommentInput
} from './mutations'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { CommentsArgs, comments } from '@/resolver/comment/queries/comments'

@Resolver(() => Comment)
export class CommentResolver {
  @FieldResolver()
  async isVoted(
    @Ctx() { loaders: { commentVoteLoader } }: Context,
    @Root() comment: Comment
  ): Promise<boolean> {
    return commentVoteLoader.load(comment.id)
  }

  // --- Queries ---
  @Query(() => [Comment])
  async comments(
    @Ctx() ctx: Context,
    @Args() args: CommentsArgs
  ): Promise<Comment[]> {
    return comments(ctx, args)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return createComment(ctx, input, notifyCommentChanged, notifyReplyChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async updateComment(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return updateComment(ctx, input, notifyCommentChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async deleteComment(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return deleteComment(ctx, input, notifyCommentChanged, notifyReplyChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async voteComment(
    @Ctx() ctx: Context,
    @Arg('input') input: VoteCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return voteComment(ctx, input, notifyCommentChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async unvoteComment(
    @Ctx() ctx: Context,
    @Arg('input') input: UnvoteCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return unvoteComment(ctx, input, notifyCommentChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async pinComment(
    @Ctx() ctx: Context,
    @Arg('input') input: PinCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return pinComment(ctx, input, notifyCommentChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async unpinComment(
    @Ctx() ctx: Context,
    @Arg('input') input: UnpinCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return unpinComment(ctx, input, notifyCommentChanged)
  }
}
