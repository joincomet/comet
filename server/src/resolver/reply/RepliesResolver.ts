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
import { replies } from '@/resolver/reply/queries/replies'
import {
  MarkReplyReadInput,
  markReplyRead,
  markAllRepliesRead
} from '@/resolver/reply/mutations'
import { SubscriptionTopic } from '@/resolver/subscriptions'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@Resolver(() => Reply)
export class RepliesResolver {
  // --- Queries ---
  @Authorized()
  @Query(() => [Reply])
  async replies(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<Reply[]> {
    return replies(ctx)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Reply)
  async markReplyRead(
    @Ctx() ctx: Context,
    @Arg('input') input: MarkReplyReadInput,
    @PubSub(SubscriptionTopic.RepliesChanged)
    notifyRepliesChanged: Publisher<BulkChangePayload>
  ): Promise<Reply> {
    return markReplyRead(ctx, input, notifyRepliesChanged)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async markAllRepliesRead(@Ctx() ctx: Context): Promise<boolean> {
    return markAllRepliesRead(ctx)
  }
}
