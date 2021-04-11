import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Reply } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import { markReplyRead } from '@/resolver/reply/mutations/markReplyRead'
import { UserReplyPayload } from '@/resolver/reply/subscriptions/UserReplyPayload'
import { markAllRepliesRead } from '@/resolver/reply/mutations/markAllRepliesRead'

@Resolver()
export class ReplyMutations {
  @Authorized()
  @Mutation(() => Reply, {
    description: 'Mark a single comment reply as read'
  })
  async markReplyRead(
    @Ctx() ctx: Context,
    @Arg('replyId', () => ID) replyId: string,
    @PubSub(SubscriptionTopic.ReplyRead)
    notifyReplyRead: Publisher<UserReplyPayload>
  ): Promise<Reply> {
    return markReplyRead(ctx, replyId, notifyReplyRead)
  }

  @Authorized()
  @Mutation(() => [Reply], {
    description: 'Mark all comment replies as read'
  })
  async markAllRepliesRead(
    @Ctx() ctx: Context,
    @PubSub(SubscriptionTopic.AllRepliesRead)
    notifyAllRepliesRead: Publisher<{ userId: string }>
  ): Promise<Reply[]> {
    return markAllRepliesRead(ctx, notifyAllRepliesRead)
  }
}
