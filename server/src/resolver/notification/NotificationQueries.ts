import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Notification } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Notification)
export class NotificationQueries {
  @Authorized()
  @Query(() => [Notification], {
    description: 'Get all notifications or only unread notifications'
  })
  async getNotifications(
    @Arg('unreadOnly', {
      defaultValue: false,
      description: 'Return only unread notifications'
    })
    unreadOnly: boolean,
    @Ctx() { user, em }: Context
  ) {
    return em.find(
      Notification,
      unreadOnly
        ? { $and: [{ toUser: user }, { isRead: false }] }
        : { toUser: user },
      ['user', 'comment.author', 'comment.post.author'],
      { createdAt: QueryOrder.DESC }
    )
  }
}
