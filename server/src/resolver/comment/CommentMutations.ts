import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { CreateCommentInput, createComment } from './mutations/createComment'
import {
  UpdateCommentInput,
  updateComment
} from '@/resolver/comment/mutations/updateComment'
import { ChangePayload, SubscriptionTopic } from '@/subscriptions'

@Resolver(() => Comment)
export class CommentMutations {
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
    notifyCommentChanged: Publisher<ChangePayload>,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Comment> {
    return updateComment(ctx, input, notifyCommentChanged, notifyReplyChanged)
  }
}
