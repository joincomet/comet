import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Notification } from '@/entity'
import { Context } from '@/types'

@Resolver()
export class NotificationMutations {
  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Mark a single notification as read'
  })
  async markNotificationRead(
    @Arg('notifId', () => ID) notifId: string,
    @Ctx() { user, em }: Context
  ) {
    const notif = await em.findOne(Notification, notifId)
    if (!notif) throw new Error('Notification not found')
    if (notif.toUser !== user) throw new Error('This is not your notification')
    notif.read = true
    await em.persistAndFlush(notif)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Mark all notifications as read' })
  async markAllNotificationsRead(@Ctx() { user, em }: Context) {
    await em
      .createQueryBuilder(Notification)
      .update({ read: true })
      .where({ toUser: user })
      .execute()
    return true
  }
}
