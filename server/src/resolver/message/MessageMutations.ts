import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Message } from '@/entity'
import { Context } from '@/types'
import {
  createMessage,
  CreateMessageInput
} from '@/resolver/message/mutations/createMessage'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import {
  updateMessage,
  UpdateMessageInput
} from '@/resolver/message/mutations/updateMessage'

@Resolver()
export class MessageMutations {
  @Authorized()
  @Mutation(() => Message)
  async createMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return createMessage(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Message)
  async updateMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return updateMessage(ctx, input, notifyMessageChanged)
  }
}
