import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  Resolver,
  PubSub
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { User, Folder, Post, Comment, UserBlock } from '@/entity'
import { uploadImage, handleUnderscore, Auth, createAccessToken } from '@/util'
import isEmail from 'validator/lib/isEmail'
import * as argon2 from 'argon2'
import { customAlphabet } from 'nanoid'
import {
  LoginResponse,
  UpdateUserArgs,
  UserGroupPayload
} from '@/resolver/user'
import { UserServerPayload } from '@/resolver/server'

const tagGenerator = customAlphabet('0123456789', 4)

@Resolver()
export class UserMutations {
  @Mutation(() => LoginResponse, { description: 'Create an account' })
  async createAccount(
    @Ctx() { em }: Context,
    @Arg('name') name: string,
    @Arg('password') password: string,
    @Arg('email') email: string
  ) {
    email = email.toLowerCase()
    if (!isEmail(email)) throw new Error('Invalid email address')

    name = name
      .replace(/ +(?= )/g, '') // remove repeated spaces
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
      .trim() // remove leading and trailing whitespace
    if (name.length < 2 || name.length > 32)
      throw new Error('Username must be 2-32 characters')

    const bannedSubstrings = ['@', '#', ':', '```']

    for (const s of bannedSubstrings) {
      if (name.includes(s)) throw new Error(`Username cannot contain '${s}'`)
    }

    const foundUser = await em.findOne(User, {
      email: handleUnderscore(email)
    })
    if (foundUser) throw new Error('Email already in use')

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
      lastLogin: new Date(),
      email
    })

    const favoritesFolder = em.create(Folder, {
      name: 'Favorites',
      owner: user
    })

    const readLaterFolder = em.create(Folder, {
      name: 'Read Later',
      owner: user
    })
    await em.persistAndFlush([user, favoritesFolder, readLaterFolder])
    await em.persistAndFlush(user)

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
  ) {
    email = email.toLowerCase()
    if (!isEmail(email)) throw new Error('Invalid email')
    const user = await em.findOne(User, { email })
    if (!user) throw new Error('Invalid Login')
    const match = await argon2.verify(user.passwordHash, password)
    if (!match) throw new Error('Invalid Login')
    if (user.isBanned)
      throw new Error(`Banned${user.banReason ? `: ${user.banReason}` : ''}`)
    user.lastLogin = new Date()
    await em.persistAndFlush(user)
    const accessToken = createAccessToken(user)
    return {
      accessToken,
      user
    } as LoginResponse
  }

  @Authorized()
  @Mutation(() => LoginResponse, { description: 'Update user properties' })
  async updateUser(
    @Args()
    { name, email, avatarFile, password, currentPassword }: UpdateUserArgs,
    @Ctx() { user, em }: Context
  ) {
    let passwordHash = user.passwordHash
    if (password) {
      if (!currentPassword) throw new Error('Must provide current password')
      const match = await argon2.verify(user.passwordHash, currentPassword)
      if (!match) throw new Error('Incorrect password')
      passwordHash = await argon2.hash(password)
    }

    const avatarUrl = avatarFile
      ? await uploadImage(avatarFile, {
          width: 256,
          height: 256
        })
      : user.avatarUrl
    em.assign(user, {
      name: name ? name : user.name,
      email: email ? email : user.email,
      avatarUrl,
      passwordHash
    })
    await em.persistAndFlush(user)
    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }

  @Authorized(Auth.Admin)
  @Mutation(() => Boolean, {
    description:
      'Ban user globally and optionally purge all posts, comments, and messages (Requires Auth.Admin)'
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
  ) {
    await em
      .createQueryBuilder(User)
      .update({
        isBanned: true,
        banReason: reason,
        servers: []
      })
      .where({ id: userId })
      .execute()
    return true
  }

  @Authorized(Auth.Admin)
  @Mutation(() => Boolean, {
    description: 'Unban a user globally (requires Auth.Admin)'
  })
  async unbanUserGlobal(
    @Arg('userId', () => ID, { description: 'ID of user to unban' })
    userId: string,
    @Ctx() { em }: Context
  ) {
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

  @Authorized(Auth.Admin)
  @Mutation(() => Boolean)
  async banPurgeUserGlobal(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('reason') reason: string,
    @Ctx() { em }: Context,
    @PubSub(SubscriptionTopic.UserLeftServer)
    userLeftServer: Publisher<UserServerPayload>,
    @PubSub(SubscriptionTopic.UserLeftGroup)
    userLeftGroup: Publisher<UserGroupPayload>
  ) {
    const bannedUser = await em.findOne(User, bannedId, ['groups'])
    em.assign(bannedUser, {
      banned: true,
      banReason: reason
    })

    for (const group of bannedUser.groups) {
      await userLeftGroup({ group, user: bannedUser })
    }
    bannedUser.groups.removeAll()

    const serverJoins = await bannedUser.serverJoins.matching({
      populate: ['server']
    })
    const servers = serverJoins.map(join => join.server)
    for (const server of servers) {
      await userLeftServer({ server, user: bannedUser })
    }
    bannedUser.serverJoins.removeAll()

    await em.persistAndFlush([bannedUser])

    await em
      .createQueryBuilder(Post)
      .update({
        isRemoved: true,
        removedReason: reason,
        isPinned: false,
        pinPosition: null
      })
      .where({ author: bannedUser })
      .execute()

    await em
      .createQueryBuilder(Comment)
      .update({
        isRemoved: true,
        removedReason: reason,
        isPinned: false,
        pinPosition: null
      })
      .where({ author: bannedUser })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async blockUser(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID) userId: string
  ) {
    const blockedUser = await em.findOneOrFail(User, userId)
    let block = await em.findOne(UserBlock, {
      user,
      blockedUser,
      isActive: false
    })
    if (block) {
      block.isActive = true
    } else {
      block = em.create(UserBlock, { user, blockedUser })
    }
    await em.persistAndFlush(block)
  }
}
