import { Resolver, Subscription } from 'type-graphql'
import { Notification } from '@/entity'
import { SubscriptionFilter, SubscriptionTopic } from '@/types'

@Resolver()
export class UserSubscriptions {
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchBlocks,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchBlocks() {
    return true
  }

  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchGroupsAndDms,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchGroupsAndDms() {
    return true
  }

  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchUsers,
    filter: async ({
      payload: userId,
      context: { user, em }
    }: SubscriptionFilter<string>) => {
      await em.populate(user, [
        'serverJoins.server.userJoins.user',
        'groups.users',
        ''
      ])
      const users = user.serverJoins
        .getItems()
        .flatMap(join =>
          join.server.userJoins.getItems().map(join => join.user)
        )
        .concat(user.groups.getItems().flatMap(group => group.users.getItems()))
        .map(u => u.id)
      return users.includes(userId)
    }
  })
  refetchUsers() {
    return true
  }
}
