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
import { Comment, Message, Post, Reply, User } from '@/entity'
import ChangeResponse from '@/resolver/subscriptions/ChangeResponse'
import { TypingFilter } from '@/resolver/subscriptions/typing/TypingFilter'
import { TypingPayload } from '@/resolver/subscriptions/typing/TypingPayload'
import {
  TypingArgs,
  TypingInput
} from '@/resolver/subscriptions/typing/TypingInput'
import { CommentSubscriptionFilter } from '@/resolver/subscriptions/filters/CommentSubscriptionFilter'
import { PostSubscriptionFilter } from '@/resolver/subscriptions/filters/PostSubscriptionFilter'
import { MessageSubscriptionFilter } from '@/resolver/subscriptions/filters/MessageSubscriptionFilter'
import { RepliesSubscriptionFilter } from '@/resolver/subscriptions/filters/RepliesSubscriptionFilter'
import BulkChangeResponse from '@/resolver/subscriptions/BulkChangeResponse'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'
import { TypingResponse } from '@/resolver/subscriptions/typing/TypingResponse'

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
    const entity = await em.findOneOrFail(Comment, id, [
      'author.user',
      'author.roles'
    ])
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
    const entity = await em.findOneOrFail(Post, id, [
      'author.roles',
      'author.user',
      'server'
    ])
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
    const entity = await em.findOneOrFail(Message, id, [
      'author',
      'serverUser.roles',
      'serverUser.user',
      'channel.server',
      'group',
      'toUser',
      'mentionedUsers'
    ])
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => RepliesChangedResponse, {
    topics: SubscriptionTopic.RepliesChanged,
    filter: RepliesSubscriptionFilter
  })
  async repliesChanged(
    @Ctx() { em, userId }: Context,
    @Root() { ids, type }: BulkChangePayload
  ): Promise<RepliesChangedResponse> {
    const entities = await em.find(
      Reply,
      { id: ids, user: userId },
      [
        'user',
        'comment.author.roles',
        'comment.author.user',
        'comment.post.author.roles',
        'comment.post.author.user',
        'comment.post.server'
      ],
      { createdAt: 'DESC' }
    )
    return getBulkResult(entities, type)
  }

  @Authorized()
  @Subscription(() => TypingResponse, {
    topics: SubscriptionTopic.TypingUpdated,
    filter: TypingFilter
  })
  typingUpdated(
    @Root()
    { typingUserId, isTyping }: TypingPayload,
    @Args() {}: TypingArgs
  ): TypingResponse {
    return {
      typingUserId,
      isTyping
    } as TypingResponse
  }

  @Authorized()
  @Mutation(() => Boolean)
  async updateTyping(
    @Ctx() { userId: currentUserId }: Context,
    @Arg('input') { channelId, groupId, userId, isTyping }: TypingInput,
    @PubSub(SubscriptionTopic.TypingUpdated)
    notifyTypingUpdated: Publisher<TypingPayload>
  ): Promise<boolean> {
    await notifyTypingUpdated({
      typingUserId: currentUserId,
      userId,
      groupId,
      channelId,
      isTyping
    })
    return true
  }
}
