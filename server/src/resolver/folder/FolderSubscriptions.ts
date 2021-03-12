import { Authorized, Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class FolderSubscriptions {
  @Authorized()
  @Subscription({
    topics: SubscriptionTopic.RefetchUserFolders,
    filter: ({ payload: userId, context: { user } }) => user.id === userId
  })
  refetchUserFolders() {
    return true
  }

  @Authorized()
  @Subscription({
    topics: SubscriptionTopic.RefetchServerFolders,
    filter: ({ payload: serverId, context: { user, em } }) =>
      user.hasJoinedServer(em, serverId)
  })
  refetchServerFolders() {
    return true
  }
}
