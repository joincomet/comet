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
    @PubSub(SubscriptionTopic.FriendRequestReceived)
    friendRequestReceived: Publisher<SubscriberPayload<User>>,
    @PubSub(SubscriptionTopic.FriendRequestSent)
    friendRequestSent: Publisher<SubscriberPayload<User>>
  ) {
    const toUser = await em.findOneOrFail(User, toUserId)
    const fr = em.create(FriendRequest, { fromUser: user, toUser })
    await em.persistAndFlush(fr)
    await friendRequestReceived({ subscriberId: toUser.id, payload: user })
    await friendRequestSent({ subscriberId: user.id, payload: toUser })
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
    @PubSub(SubscriptionTopic.FriendRequestRemoved)
    friendRequestRemoved: Publisher<SubscriberPayload<string>>
  ) {
    const toUser = await em.findOneOrFail(User, toUserId)
    const fr = await em.findOneOrFail(FriendRequest, { fromUser: user, toUser })
    fr.status = FriendRequestStatus.Revoked
    await em.persistAndFlush(fr)
    await friendRequestRemoved({
      subscriberId: user.id,
      payload: toUser.id
    })
    await friendRequestRemoved({
      subscriberId: toUser.id,
      payload: user.id
    })
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Ignore (reject) a friend request' })
  async ignoreFriendRequest(
    @Ctx() { em, user: currentUser }: Context,
    @Arg('fromUserId', () => ID, {
      description: 'ID of user whose friend request will be ignored'
    })
    fromUserId: string,
    @PubSub(SubscriptionTopic.FriendRequestRemoved)
    friendRequestRemoved: Publisher<SubscriberPayload<string>>
  ) {
    const fromUser = await em.findOneOrFail(User, fromUserId)
    const fr = await em.findOneOrFail(FriendRequest, {
      fromUser,
      toUser: currentUser
    })
    fr.status = FriendRequestStatus.Ignored
    await em.persistAndFlush(fr)
    await friendRequestRemoved({
      subscriberId: currentUser.id,
      payload: fromUser.id
    })
    await friendRequestRemoved({
      subscriberId: fromUser.id,
      payload: currentUser.id
    })
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Accept a friend request' })
  async acceptFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('fromUserId', () => ID, {
      description: 'ID of user whose friend request will be accepted'
    })
    fromUserId: string,
    @PubSub(SubscriptionTopic.FriendAdded)
    friendAdded: Publisher<SubscriberPayload<User>>,
    @PubSub(SubscriptionTopic.FriendRequestRemoved)
    friendRequestRemoved: Publisher<SubscriberPayload<string>>
  ) {
    const fromUser = await em.findOneOrFail(User, fromUserId)
    const fr = await em.findOneOrFail(FriendRequest, {
      fromUser,
      toUser: user
    })
    fr.status = FriendRequestStatus.Accepted

    await friendRequestRemoved({
      subscriberId: fromUserId,
      payload: user.id
    })
    await friendRequestRemoved({
      subscriberId: user.id,
      payload: fromUser.id
    })

    const friendRel = em.create(FriendRelationship, {
      user1: fromUser,
      user2: user
    })

    await friendAdded({ subscriberId: user.id, payload: fromUser })
    await friendAdded({ subscriberId: fromUser.id, payload: user })

    await em.persistAndFlush([fr, friendRel])
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Remove a friend' })
  async removeFriend(
    @Ctx() { user, em }: Context,
    @Arg('friendId', () => ID, { description: 'ID of friend to remove' })
    friendId: string,
    @PubSub(SubscriptionTopic.FriendRemoved)
    friendRemoved: Publisher<SubscriberPayload<string>>
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

    await friendRemoved({ subscriberId: user.id, payload: friend.id })
    await friendRemoved({ subscriberId: friend.id, payload: user.id })
  }
}
