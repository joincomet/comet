import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Reply } from '@/entity'
import { Context } from '@/types'
import { markAllRepliesRead } from '@/resolver/reply/mutations/markAllRepliesRead'
import { SubscriptionTopic } from '@/resolver/subscriptions'
import {
  updateReply,
  UpdateReplyInput
} from '@/resolver/reply/mutations/updateReply'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@Resolver()
export class ReplyMutations {
  @Authorized()
  @Mutation(() => Reply)
  async updateReply(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateReplyInput,
    @PubSub(SubscriptionTopic.RepliesChanged)
    notifyRepliesChanged: Publisher<BulkChangePayload>
  ): Promise<Reply> {
    return updateReply(ctx, input, notifyRepliesChanged)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllRepliesRead(@Ctx() ctx: Context): Promise<boolean> {
    return markAllRepliesRead(ctx)
  }
}
