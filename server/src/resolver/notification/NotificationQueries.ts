import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Notification } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Notification)
export class NotificationQueries {
  @Authorized()
  @Query(() => [Notification])
  async getNotifications(
    @Arg('unreadOnly', { defaultValue: false }) unreadOnly: boolean,
    @Ctx() { user, em }: Context
  ) {
    return em.find(
      Notification,
      unreadOnly ? { $and: [{ user }, { read: false }] } : { user },
      ['user', 'comment.author', 'comment.post.author'],
      { createdAt: QueryOrder.DESC }
    )
  }
}
