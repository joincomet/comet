import {
  Args,
  Authorized,
  Ctx,
  Publisher,
  PubSub,
  Query,
  Resolver
} from 'type-graphql'
import { Message } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import {
  GetMessagesArgs,
  GetMessagesResponse
} from '@/resolver/message/queries/getMessages'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { getMessages } from '@/resolver/message/queries/getMessages'

@Resolver(() => Message)
export class MessageQueries {
  @Authorized()
  @Query(() => [GetMessagesResponse])
  async getMessages(
    @Ctx() ctx: Context,
    @Args()
    args: GetMessagesArgs,
    @PubSub(SubscriptionTopic.DmOpened)
    notifyDmOpened: Publisher<DmPayload>
  ): Promise<GetMessagesResponse[]> {
    return getMessages(ctx, args, notifyDmOpened)
  }
}
