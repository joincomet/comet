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
import { Reply } from '@/entity'
import { Context } from '@/types'
import { markAllRepliesRead } from '@/resolver/reply/mutations/markAllRepliesRead'
import { ChangePayload, SubscriptionTopic } from '@/subscriptions'
import {
  UpdateReplyInput,
  updateReply
} from '@/resolver/reply/mutations/updateReply'

@Resolver()
export class ReplyMutations {
  @Authorized()
  @Mutation(() => Reply)
  async updateReply(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateReplyInput,
    @PubSub(SubscriptionTopic.ReplyChanged)
    notifyReplyChanged: Publisher<ChangePayload>
  ): Promise<Reply> {
    return updateReply(ctx, input, notifyReplyChanged)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllRepliesRead(@Ctx() ctx: Context): Promise<boolean> {
    return markAllRepliesRead(ctx)
  }
}
