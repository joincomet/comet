import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Notification } from '@/entity'
import { Context } from '@/types'

@Resolver()
export class NotificationMutations {
  @Authorized()
  @Mutation(() => Notification, {
    description: 'Mark a single notification as read'
  })
  async markNotificationRead(
    @Arg('notifId', () => ID) notifId: string,
    @Ctx() { user, em }: Context
  ): Promise<Notification> {
    const notif = await em.findOneOrFail(Notification, notifId)
    if (notif.toUser !== user) throw new Error('error.notif.notYours')
    notif.isRead = true
    await em.persistAndFlush(notif)
    return notif
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Mark all notifications as read' })
  async markAllNotificationsRead(
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    await em
      .createQueryBuilder(Notification)
      .update({ isRead: true })
      .where({ toUser: user })
      .execute()
    return true
  }
}
