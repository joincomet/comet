import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { SubscriptionTopic } from '@/resolver/subscriptions/SubscriptionTopic'
import { Context } from '@/types'
import { ChangePayload } from '@/resolver/subscriptions/ChangePayload'
import { ChangeType } from '@/resolver/subscriptions/ChangeType'
import { Comment, Message, Post, Reply } from '@/entity'
import ChangeResponse from '@/resolver/subscriptions/ChangeResponse'
import { TypingFilter } from '@/resolver/subscriptions/typing/TypingFilter'
import { TypingPayload } from '@/resolver/subscriptions/typing/TypingPayload'
import { TypingArgs } from '@/resolver/subscriptions/typing/TypingArgs'
import { CommentSubscriptionFilter } from '@/resolver/subscriptions/filters/CommentSubscriptionFilter'
import { PostSubscriptionFilter } from '@/resolver/subscriptions/filters/PostSubscriptionFilter'
import { MessageSubscriptionFilter } from '@/resolver/subscriptions/filters/MessageSubscriptionFilter'
import { RepliesSubscriptionFilter } from '@/resolver/subscriptions/filters/RepliesSubscriptionFilter'
import BulkChangeResponse from '@/resolver/subscriptions/BulkChangeResponse'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@ObjectType()
class CommentChangedResponse extends ChangeResponse(Comment) {}
@ObjectType()
class PostChangedResponse extends ChangeResponse(Post) {}
@ObjectType()
class MessageChangedResponse extends ChangeResponse(Message) {}
@ObjectType()
class RepliesChangedResponse extends BulkChangeResponse(Reply) {}

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

function getBulkResult<TItem>(
  entities: TItem[],
  type: ChangeType
): { added: TItem[]; updated: TItem[]; deleted: TItem[] } {
  switch (type) {
    case ChangeType.Added:
      return { added: entities, updated: [], deleted: [] }
    case ChangeType.Updated:
      return { updated: entities, added: [], deleted: [] }
    case ChangeType.Deleted:
      return { deleted: entities, added: [], updated: [] }
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
  @Subscription(() => RepliesChangedResponse, {
    topics: SubscriptionTopic.RepliesChanged,
    filter: RepliesSubscriptionFilter
  })
  async repliesChanged(
    @Ctx() { em, user }: Context,
    @Root() { ids, type }: BulkChangePayload
  ): Promise<RepliesChangedResponse> {
    const entities = await em.find(
      Reply,
      { id: ids, user },
      [
        'fromUser',
        'comment.author',
        'parentComment.author',
        'post.server',
        'post.author'
      ],
      { createdAt: 'DESC' }
    )
    return getBulkResult(entities, type)
  }

  @Authorized()
  @Subscription(() => String, {
    topics: SubscriptionTopic.UserStartedTyping,
    filter: TypingFilter
  })
  userStartedTyping(
    @Root()
    { username }: TypingPayload,
    @Args() {}: TypingArgs
  ): string {
    return username
  }

  @Authorized()
  @Mutation(() => Boolean)
  async startTyping(
    @Ctx() { user }: Context,
    @Args() { channelId, groupId, userId }: TypingArgs,
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
