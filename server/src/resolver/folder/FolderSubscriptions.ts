import { Authorized, Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class FolderSubscriptions {
  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchUserFolders,
    filter: ({ payload: userId, context: { user } }) => user.id === userId
  })
  refetchUserFolders() {
    return true
  }

  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchServerFolders,
    filter: ({ payload: serverId, context: { user, em } }) =>
      user.hasJoinedServer(em, serverId)
  })
  refetchServerFolders() {
    return true
  }
}
