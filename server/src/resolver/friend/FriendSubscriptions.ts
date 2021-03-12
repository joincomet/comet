import { ID, Resolver, Root, Subscription } from 'type-graphql'
import { User } from '@/entity'
import { SubscriptionTopic, SubscriberPayload } from '@/types'
import { subscriberFilter as filter } from '@/util'

@Resolver()
export class FriendSubscriptions {
  @Subscription(() => User, {
    topics: SubscriptionTopic.FriendRequestSent,
    filter,
    description: 'Published to current user when a friend request is sent'
  })
  friendRequestSent(@Root() { payload: user }: SubscriberPayload<User>) {
    return user
  }

  @Subscription(() => User, {
    topics: SubscriptionTopic.FriendRequestReceived,
    filter,
    description:
      'Published to requested friend when a friend request is received'
  })
  friendRequestReceived(@Root() { payload: user }: SubscriberPayload<User>) {
    return user
  }

  @Subscription(() => ID, {
    topics: SubscriptionTopic.FriendRequestRemoved,
    filter,
    description:
      'Published to current user and requested friend when a friend request is ignored, accepted, or revoked'
  })
  friendRequestRemoved(@Root() { payload: userId }: SubscriberPayload<string>) {
    return userId
  }

  @Subscription(() => User, {
    topics: SubscriptionTopic.FriendAdded,
    filter,
    description:
      'Published to current user and friend when a friend request is accepted'
  })
  friendAdded(@Root() { payload: friend }: SubscriberPayload<User>) {
    return friend
  }

  @Subscription(() => ID, {
    topics: SubscriptionTopic.FriendRemoved,
    filter,
    description:
      'Published to current user and ex-friend when a friend is removed'
  })
  friendRemoved(@Root() { payload: friendId }: SubscriberPayload<string>) {
    return friendId
  }
}
