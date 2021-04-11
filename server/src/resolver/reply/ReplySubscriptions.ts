import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'
import { currentUserFilter } from '@/util/currentUserFilter'
import { Reply } from '@/entity'

@Resolver()
export class ReplySubscriptions {
  @Authorized()
  @Subscription(() => Reply, {
    topics: SubscriptionTopic.ReplyReceived,
    filter: currentUserFilter
  })
  async replyReceived(@Ctx() { em }, @Root() { replyId }): Promise<Reply> {
    return em.find(Reply, replyId, [
      'fromUser',
      'comment.author',
      'parentComment.author',
      'post.server',
      'post.author'
    ])
  }

  @Authorized()
  @Subscription(() => Reply, {
    topics: SubscriptionTopic.ReplyRead,
    filter: currentUserFilter
  })
  async replyRead(@Ctx() { em }, @Root() { replyId }): Promise<Reply> {
    return em.find(Reply, replyId, [
      'fromUser',
      'comment.author',
      'parentComment.author',
      'post.server',
      'post.author'
    ])
  }

  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.AllRepliesRead,
    filter: currentUserFilter
  })
  allRepliesRead(): boolean {
    return true
  }
}
