import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { SubscriptionTopic } from '@/subscriptions/SubscriptionTopic'
import { Context } from '@/types'
import { ChangePayload } from '@/subscriptions/ChangePayload'
import { ChangeType } from '@/subscriptions/ChangeType'
import { Comment, Message, Post, Reply } from '@/entity'
import ChangeResponse from '@/subscriptions/ChangeResponse'
import { TypingFilter } from '@/subscriptions/typing/TypingFilter'
import { TypingPayload } from '@/subscriptions/typing/TypingPayload'
import { TypingInput } from '@/subscriptions/typing/TypingInput'
import { CommentSubscriptionFilter } from '@/subscriptions/filters/CommentSubscriptionFilter'
import { PostSubscriptionFilter } from '@/subscriptions/filters/PostSubscriptionFilter'
import { MessageSubscriptionFilter } from '@/subscriptions/filters/MessageSubscriptionFilter'
import { ReplySubscriptionFilter } from '@/subscriptions/filters/ReplySubscriptionFilter'

class CommentChangedResponse extends ChangeResponse(Comment) {}
class PostChangedResponse extends ChangeResponse(Post) {}
class MessageChangedResponse extends ChangeResponse(Message) {}
class ReplyChangedResponse extends ChangeResponse(Reply) {}

function getResult<TItem>(
  entity: TItem,
  type: ChangeType
): { added?: TItem; updated?: TItem; deleted?: TItem } {
  switch (type) {
    case ChangeType.Added:
      return { added: entity }
    case ChangeType.Updated:
      return { updated: entity }
    case ChangeType.Deleted:
      return { deleted: entity }
  }
}

@Resolver()
export class SubscriptionResolver {
  @Authorized()
  @Subscription(() => CommentChangedResponse, {
    topics: SubscriptionTopic.CommentChanged,
    filter: CommentSubscriptionFilter
  })
  async commentChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<CommentChangedResponse> {
    const entity = await em.findOneOrFail(Comment, id)
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => PostChangedResponse, {
    topics: SubscriptionTopic.PostChanged,
    filter: PostSubscriptionFilter
  })
  async postChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<PostChangedResponse> {
    const entity = await em.findOneOrFail(Post, id)
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => MessageChangedResponse, {
    topics: SubscriptionTopic.MessageChanged,
    filter: MessageSubscriptionFilter
  })
  async messageChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<MessageChangedResponse> {
    const entity = await em.findOneOrFail(Message, id)
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => ReplyChangedResponse, {
    topics: SubscriptionTopic.ReplyChanged,
    filter: ReplySubscriptionFilter
  })
  async replyChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<ReplyChangedResponse> {
    const entity = await em.findOneOrFail(Reply, id)
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => String, {
    topics: SubscriptionTopic.UserStartedTyping,
    filter: TypingFilter
  })
  userStartedTyping(
    @Root()
    { username }: TypingPayload,
    @Args() {}: TypingInput
  ): string {
    return username
  }

  @Authorized()
  @Mutation(() => Boolean)
  async startTyping(
    @Ctx() { user }: Context,
    @Args() { channelId, groupId, userId }: TypingInput,
    @PubSub(SubscriptionTopic.UserStartedTyping)
    notifyUserStartedTyping: Publisher<TypingPayload>
  ): Promise<boolean> {
    await notifyUserStartedTyping({
      username: user.username,
      userId,
      groupId,
      channelId
    })
    return true
  }
}
