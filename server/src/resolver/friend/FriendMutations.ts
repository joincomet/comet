import { FriendRelationship, FriendRequest, User } from '@/entity'
import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { FriendRequestStatus } from '@/resolver/friend'
import { SubscriberPayload } from '@/types/subscriptions/SubscriberPayload'

@Resolver()
export class FriendMutations {
  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Request to be friends with a user'
  })
  async createFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('toUserId', () => ID, {
      description: 'ID of user who will receive friend request'
    })
    toUserId: string,
    @PubSub(SubscriptionTopic.RefetchFriendRequests)
    refetchFriendRequests: Publisher<string>
  ) {
    const toUser = await em.findOneOrFail(User, toUserId)
    const fr = em.create(FriendRequest, { fromUser: user, toUser })
    await em.persistAndFlush(fr)
    await refetchFriendRequests(user.id)
    await refetchFriendRequests(toUser.id)
  }

  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Revoke a friend request sent to a user'
  })
  async revokeFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('toUserId', () => ID, {
      description: 'ID of user whose friend request will be revoked'
    })
    toUserId: string,
    @PubSub(SubscriptionTopic.RefetchFriendRequests)
    refetchFriendRequests: Publisher<string>
  ) {
    const toUser = await em.findOneOrFail(User, toUserId)
    const fr = await em.findOneOrFail(FriendRequest, { fromUser: user, toUser })
    fr.status = FriendRequestStatus.Revoked
    await em.persistAndFlush(fr)
    await refetchFriendRequests(user.id)
    await refetchFriendRequests(toUser.id)
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Ignore (reject) a friend request' })
  async ignoreFriendRequest(
    @Ctx() { em, user: currentUser }: Context,
    @Arg('fromUserId', () => ID, {
      description: 'ID of user whose friend request will be ignored'
    })
    fromUserId: string,
    @PubSub(SubscriptionTopic.RefetchFriendRequests)
    refetchFriendRequests: Publisher<string>
  ) {
    const fromUser = await em.findOneOrFail(User, fromUserId)
    const fr = await em.findOneOrFail(FriendRequest, {
      fromUser,
      toUser: currentUser
    })
    fr.status = FriendRequestStatus.Ignored
    await em.persistAndFlush(fr)
    await refetchFriendRequests(currentUser.id)
    await refetchFriendRequests(fromUser.id)
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Accept a friend request' })
  async acceptFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('fromUserId', () => ID, {
      description: 'ID of user whose friend request will be accepted'
    })
    fromUserId: string,
    @PubSub(SubscriptionTopic.RefetchFriendRequests)
    refetchFriendRequests: Publisher<string>,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ) {
    const fromUser = await em.findOneOrFail(User, fromUserId)
    const fr = await em.findOneOrFail(FriendRequest, {
      fromUser,
      toUser: user
    })
    fr.status = FriendRequestStatus.Accepted

    const friendRel = em.create(FriendRelationship, {
      user1: fromUser,
      user2: user
    })

    await em.persistAndFlush([fr, friendRel])

    await refetchFriendRequests(fromUser.id)
    await refetchFriendRequests(user.id)

    await refetchFriends(fromUser.id)
    await refetchFriends(user.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Remove a friend' })
  async removeFriend(
    @Ctx() { user, em }: Context,
    @Arg('friendId', () => ID, { description: 'ID of friend to remove' })
    friendId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ) {
    const friend = await em.findOneOrFail(User, friendId)
    const friendRel = await em.findOneOrFail(FriendRelationship, {
      $or: [
        { user1: user, user2: friend },
        { user1: friend, user2: user }
      ]
    })
    em.remove(friendRel)
    await em.flush()

    await refetchFriends(user.id)
    await refetchFriends(friend.id)
  }
}
