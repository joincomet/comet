import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver
} from 'type-graphql'
import { Reply } from '@/entity'
import { Context } from '@/types'
import { replies, RepliesInput } from '@/resolver/reply/queries/replies'
import {
  MarkReplyReadInput,
  markReplyRead,
  markReplyUnread,
  MarkReplyUnreadInput
} from '@/resolver/reply/mutations'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'

@Resolver(() => Reply)
export class RepliesResolver {
  // --- Queries ---
  @Authorized()
  @Query(() => [Reply])
  async replies(
    @Ctx() ctx: Context,
    @Arg('input') input: RepliesInput
  ): Promise<Reply[]> {
    return replies(ctx, input)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Reply)
  async markReplyRead(
    @Ctx() ctx: Context,
    @Arg('input') input: MarkReplyReadInput,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Reply> {
    return markReplyRead(ctx, input, notifyReplyChanged)
  }

  @Authorized()
  @Mutation(() => Reply)
  async markReplyUnread(
    @Ctx() ctx: Context,
    @Arg('input') input: MarkReplyUnreadInput,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Reply> {
    return markReplyUnread(ctx, input, notifyReplyChanged)
  }
}
