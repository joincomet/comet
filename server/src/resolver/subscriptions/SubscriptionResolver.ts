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
import { Comment } from '@/entity/comment/Comment'
import { Message } from '@/entity/message/Message'
import { Post } from '@/entity/post/Post'
import { Reply } from '@/entity/comment/Reply'
import ChangeResponse from '@/resolver/subscriptions/ChangeResponse'
import { TypingFilter } from '@/resolver/subscriptions/typing/TypingFilter'
import { TypingPayload } from '@/resolver/subscriptions/typing/TypingPayload'
import {
  TypingArgs,
  TypingInput
} from '@/resolver/subscriptions/typing/TypingInput'
import { MessageSubscriptionFilter } from '@/resolver/subscriptions/filters/MessageSubscriptionFilter'
import { RepliesSubscriptionFilter } from '@/resolver/subscriptions/filters/RepliesSubscriptionFilter'
import { TypingResponse } from '@/resolver/subscriptions/typing/TypingResponse'
import {logger} from "@/util";

@ObjectType()
class CommentChangedResponse extends ChangeResponse(Comment) {}
@ObjectType()
class PostChangedResponse extends ChangeResponse(Post) {}
@ObjectType()
class MessageChangedResponse extends ChangeResponse(Message) {}
@ObjectType()
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
  @Subscription(() => CommentChangedResponse, {
    topics: SubscriptionTopic.CommentChanged
  })
  async commentChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<CommentChangedResponse> {
    logger('commentChanged')
    em = em.fork()
    const entity = await em.findOneOrFail(Comment, id, ['author'])
    return getResult(entity, type)
  }

  @Subscription(() => PostChangedResponse, {
    topics: SubscriptionTopic.PostChanged
  })
  async postChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<PostChangedResponse> {
    logger('postChanged')
    em = em.fork()
    const entity = await em.findOneOrFail(Post, id, ['author', 'server'])
    return getResult(entity, type)
  }

  @Subscription(() => MessageChangedResponse, {
    topics: SubscriptionTopic.MessageChanged,
    filter: MessageSubscriptionFilter
  })
  async messageChanged(
    @Ctx() { em }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<MessageChangedResponse> {
    logger('messageChanged')
    em = em.fork()
    const entity = await em.findOneOrFail(Message, id, [
      'author',
      'channel.server',
      'group',
      'toUser',
      'mentionedUsers'
    ])
    return getResult(entity, type)
  }

  @Authorized()
  @Subscription(() => ReplyChangedResponse, {
    topics: SubscriptionTopic.ReplyChanged,
    filter: RepliesSubscriptionFilter
  })
  async replyChanged(
    @Ctx() { em, userId }: Context,
    @Root() { id, type }: ChangePayload
  ): Promise<ReplyChangedResponse> {
    logger('replyChanged')
    em = em.fork()
    const entity = await em.findOneOrFail(Reply, { id, user: userId }, [
      'user',
      'comment.author',
      'comment.post.author',
      'comment.post.server'
    ])
    return getResult(entity, type)
  }

  @Subscription(() => TypingResponse, {
    topics: SubscriptionTopic.TypingUpdated,
    filter: TypingFilter
  })
  typingUpdated(
    @Root()
    { typingUserId, isTyping }: TypingPayload,
    @Args() {}: TypingArgs
  ): TypingResponse {
    logger('typingUpdated')
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
    logger('updateTyping')
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
