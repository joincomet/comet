import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { createComment, CreateCommentInput } from './mutations/createComment'
import {
  updateComment,
  UpdateCommentInput
} from '@/resolver/comment/mutations/updateComment'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@Resolver(() => Comment)
export class CommentMutations {
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>,
    @PubSub(SubscriptionTopic.RepliesChanged)
    notifyRepliesChanged: Publisher<BulkChangePayload>
  ): Promise<Comment> {
    return createComment(ctx, input, notifyCommentChanged, notifyRepliesChanged)
  }

  @Authorized()
  @Mutation(() => Comment)
  async updateComment(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateCommentInput,
    @PubSub(SubscriptionTopic.CommentChanged)
    notifyCommentChanged: Publisher<ChangePayload>,
    @PubSub(SubscriptionTopic.RepliesChanged)
    notifyRepliesChanged: Publisher<BulkChangePayload>
  ): Promise<Comment> {
    return updateComment(ctx, input, notifyCommentChanged, notifyRepliesChanged)
  }
}
