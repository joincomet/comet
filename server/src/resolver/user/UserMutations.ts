import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import {
  Comment,
  Folder,
  FriendData,
  Message,
  Post,
  Server,
  ServerUserJoin,
  User
} from '@/entity'
import {
  createAccessToken,
  handleUnderscore,
  tagGenerator,
  uploadImageSingle
} from '@/util'
import isEmail from 'validator/lib/isEmail'
import * as argon2 from 'argon2'
import {
  ChangePasswordArgs,
  FriendStatus,
  LoginResponse,
  UpdateUserArgs
} from '@/resolver/user'
import { CustomError } from '@/types/CustomError'
import { FolderVisibility } from '@/resolver/folder'

@Resolver()
export class UserMutations {
  @Mutation(() => LoginResponse, { description: 'Create an account' })
  async createAccount(
    @Ctx() { em }: Context,
    @Arg('name') name: string,
    @Arg('password') password: string,
    @Arg('email') email: string
  ): Promise<LoginResponse> {
    email = email.toLowerCase()
    if (!isEmail(email)) throw new Error('error.login.invalidEmail')

    name = name
      .replace(/ +(?= )/g, '') // remove repeated spaces
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
      .trim() // remove leading and trailing whitespace
    if (name.length < 2 || name.length > 32)
      throw new Error('error.login.nameLength')

    const bannedSubstrings = ['@', '#', ':', '```']

    for (const s of bannedSubstrings) {
      if (name.includes(s)) throw new CustomError('error.login.illegalName', s)
    }

    const foundUser = await em.findOne(User, {
      email: handleUnderscore(email)
    })
    if (foundUser) throw new Error('error.login.emailInUse')

    const passwordHash = await argon2.hash(password)

    let tag = tagGenerator()

    while (
      await em.findOne(User, {
        $and: [{ name: { $ilike: handleUnderscore(name) } }, { tag }]
      })
    ) {
      tag = tagGenerator()
    }

    const user = em.create(User, {
      name,
      tag,
      passwordHash,
      lastLoginAt: new Date(),
      email
    })

    const favoritesFolder = em.create(Folder, {
      name: 'Favorites',
      owner: user,
      visibility: FolderVisibility.Private
    })

    const readLaterFolder = em.create(Folder, {
      name: 'Read Later',
      owner: user,
      visibility: FolderVisibility.Private
    })

    const cometServer = await em.findOne(Server, { name: 'Comet' })
    const join = await em.create(ServerUserJoin, { user, server: cometServer })

    await em.persistAndFlush([user, favoritesFolder, readLaterFolder, join])
    user.username = `${user.name}#${user.tag}`
    const accessToken = createAccessToken(user)
    return {
      accessToken,
      user
    } as LoginResponse
  }

  @Mutation(() => LoginResponse, {
    description: 'Log in with email and password'
  })
  async login(
    @Ctx() { em }: Context,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    email = email.toLowerCase()
    if (!isEmail(email)) throw new Error('error.login.invalidEmail')
    const user = await em.findOne(User, { email })
    if (!user) throw new Error('error.login.invalid')
    const match = await argon2.verify(user.passwordHash, password)
    if (!match) throw new Error('error.login.invalid')
    if (user.isBanned)
      throw new CustomError(
        'error.login.banned',
        user.banReason ? `: ${user.banReason}` : ''
      )
    user.lastLoginAt = new Date()
    await em.persistAndFlush(user)
    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }

  @Authorized()
  @Mutation(() => LoginResponse, { description: 'Change password' })
  async changePassword(
    @Ctx() { em, user }: Context,
    @Args() { password, currentPassword }: ChangePasswordArgs
  ): Promise<LoginResponse> {
    const match = await argon2.verify(user.passwordHash, currentPassword)
    if (!match) throw new Error('error.login.wrongPassword')
    user.passwordHash = await argon2.hash(password)
    await em.persistAndFlush(user)
    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }

  @Authorized()
  @Mutation(() => User, { description: 'Update user properties' })
  async updateUser(
    @Args()
    { name, email, avatarFile }: UpdateUserArgs,
    @Ctx() { user, em }: Context
  ): Promise<User> {
    const avatarUrl = avatarFile
      ? await uploadImageSingle(
          avatarFile,
          {
            width: 256,
            height: 256
          },
          true
        )
      : user.avatarUrl
    em.assign(user, {
      name: name ? name : user.name,
      email: email ? email : user.email,
      avatarUrl
    })
    await em.persistAndFlush(user)
    return user
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean, {
    description:
      'Ban user globally and optionally purge all posts, comments, and messages (requires admin)'
  })
  async banUserGlobal(
    @Ctx() { em }: Context,
    @Arg('userId', () => ID, { description: 'ID of user to ban' })
    userId: string,
    @Arg('purge', {
      defaultValue: false,
      description: "Purge (remove all) user's posts, comments, and messages"
    })
    purge: boolean,
    @Arg('reason', { nullable: true, description: 'Reason for ban' })
    reason?: string
  ): Promise<boolean> {
    const user = await em.findOneOrFail(User, userId)
    await em
      .createQueryBuilder(User)
      .update({
        isBanned: true,
        banReason: reason
      })
      .where({ id: userId })
      .execute()
    await em.nativeDelete(ServerUserJoin, { user })
    if (purge) {
      await em
        .createQueryBuilder(Post)
        .update({
          isDeleted: true
        })
        .where({ author: user })
        .execute()

      await em
        .createQueryBuilder(Comment)
        .update({
          isDeleted: true
        })
        .where({ author: user })
        .execute()

      await em
        .createQueryBuilder(Message)
        .update({
          isDeleted: true
        })
        .where({ author: user })
        .execute()
    }
    return true
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean, {
    description: 'Unban a user globally (requires admin)'
  })
  async unbanUserGlobal(
    @Arg('userId', () => ID, { description: 'ID of user to unban' })
    userId: string,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    await em
      .createQueryBuilder(User)
      .update({
        isBanned: false,
        banReason: null
      })
      .where({ id: userId })
      .execute()
    return true
  }

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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
    @PubSub(SubscriptionTopic.RefetchUserRelationships)
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
