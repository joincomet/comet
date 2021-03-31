import { User, FriendData } from '@/entity'
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
import { FriendStatus } from '@/resolver/friend'

@Resolver()
export class FriendMutations {
  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Request to be friends with a user'
  })
  async createFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID, {
      description: 'ID of user who will receive friend request'
    })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    let myData = await em.findOne(FriendData, { user, toUser })
    if (!myData) myData = em.create(FriendData, { user, toUser })

    let theirData = await em.findOne(FriendData, {
      user: toUser,
      toUser: user
    })
    if (!theirData)
      theirData = em.create(FriendData, { user: toUser, toUser: user })

    if (myData.status === FriendStatus.Blocking)
      throw new Error('error.user.blocking')
    if (myData.status === FriendStatus.Blocked)
      throw new Error('error.user.blocked')

    myData.status = FriendStatus.FriendRequestOutgoing
    theirData.status = FriendStatus.FriendRequestIncoming
    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])
    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Revoke a friend request sent to a user'
  })
  async revokeFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID, {
      description: 'ID of user whose friend request will be revoked'
    })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOne(FriendData, { user, toUser })

    const theirData = await em.findOne(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status !== FriendStatus.FriendRequestOutgoing)
      throw new Error('error.user.friendRequestNotSent')

    myData.status = FriendStatus.None
    theirData.status = FriendStatus.None
    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])
    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Ignore (reject) a friend request' })
  async ignoreFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID, {
      description: 'ID of user whose friend request will be ignored'
    })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOneOrFail(FriendData, { user, toUser })

    const theirData = await em.findOneOrFail(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status !== FriendStatus.FriendRequestIncoming)
      throw new Error('error.user.friendRequestNotReceived')

    myData.status = FriendStatus.None
    theirData.status = FriendStatus.None
    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])
    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Accept a friend request' })
  async acceptFriendRequest(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID, {
      description: 'ID of user whose friend request will be accepted'
    })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOneOrFail(FriendData, { user, toUser })

    const theirData = await em.findOneOrFail(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status !== FriendStatus.FriendRequestIncoming)
      throw new Error('error.user.friendRequestNotReceived')

    myData.status = FriendStatus.Friends
    theirData.status = FriendStatus.Friends
    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])

    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Remove a friend' })
  async removeFriend(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID, { description: 'ID of friend to remove' })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOneOrFail(FriendData, { user, toUser })

    const theirData = await em.findOneOrFail(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status !== FriendStatus.Friends)
      throw new Error('error.user.notFriends')

    myData.status = FriendStatus.None
    theirData.status = FriendStatus.None
    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])

    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Block a user' })
  async blockUser(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID, { description: 'ID of user to block' })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOneOrFail(FriendData, { user, toUser })

    const theirData = await em.findOneOrFail(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status === FriendStatus.Blocking)
      throw new Error('error.user.alreadyBlocking')

    myData.status = FriendStatus.Blocking
    if (theirData.status !== FriendStatus.Blocking)
      theirData.status = FriendStatus.Blocked

    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])

    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'Unblock a user' })
  async unblockUser(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID, { description: 'ID of user to unblock' })
    userId: string,
    @PubSub(SubscriptionTopic.RefetchFriends)
    refetchFriends: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const myData = await em.findOneOrFail(FriendData, { user, toUser })

    const theirData = await em.findOneOrFail(FriendData, {
      user: toUser,
      toUser: user
    })

    if (myData.status !== FriendStatus.Blocking)
      throw new Error('error.user.notBlocking')

    myData.status = FriendStatus.None
    if (theirData.status === FriendStatus.Blocked)
      theirData.status = FriendStatus.None

    const date = new Date()
    myData.updatedAt = date
    theirData.updatedAt = date

    await em.persistAndFlush([myData, theirData])

    await refetchFriends(user.id)
    await refetchFriends(toUser.id)

    return true
  }
}
