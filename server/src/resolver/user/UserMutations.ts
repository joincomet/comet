import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Resolver
} from 'type-graphql'
import { Context } from '@/types'
import { User, Folder, Post, Comment } from '@/entity'
import { uploadImage } from '@/util/s3'
import { LoginResponse } from '@/resolver/user/types'
import isEmail from 'validator/lib/isEmail'
import { handleUnderscore } from '@/util/text'
import * as argon2 from 'argon2'
import { Auth, createAccessToken } from '@/util/auth'
import { customAlphabet } from 'nanoid'
import { UpdateUserArgs } from '@/resolver/user/types/UpdateUserArgs'
import { UserBanGlobal } from '@/entity/UserBanGlobal'

const tagGenerator = customAlphabet('0123456789', 4)

@Resolver()
export class UserMutations {
  @Mutation(() => LoginResponse)
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

  @Mutation(() => LoginResponse)
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
    const ban = await em.findOne(UserBanGlobal, { user })
    if (ban) throw new Error(`Banned${ban.reason ? `: ${ban.reason}` : '.'}`)
    user.lastLogin = new Date()
    await em.persistAndFlush(user)
    const accessToken = createAccessToken(user)
    return {
      accessToken,
      user
    } as LoginResponse
  }

  @Authorized()
  @Mutation(() => LoginResponse)
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
  @Mutation(() => Boolean)
  async banUserGlobal(
    @Ctx() { em }: Context,
    @Arg('userId', () => ID) userId: string,
    @Arg('purge', { defaultValue: false }) purge: boolean,
    @Arg('reason', { nullable: true }) reason?: string
  ) {
    await em
      .createQueryBuilder(User)
      .update({
        banned: true,
        banReason: reason,
        servers: []
      })
      .where({ id: userId })
      .execute()
    return true
  }

  @Authorized(Auth.Admin)
  @Mutation(() => Boolean)
  async unbanUserGlobal(
    @Arg('bannedId', () => ID) bannedId: string,
    @Ctx() { em }: Context
  ) {
    await em
      .createQueryBuilder(User)
      .update({
        banned: false,
        banReason: null
      })
      .where({ id: bannedId })
      .execute()
    return true
  }

  @Authorized(Auth.Admin)
  @Mutation(() => Boolean)
  async banPurgeUserGlobal(
    @Arg('bannedId', () => ID) bannedId: string,
    @Arg('reason') reason: string,
    @Ctx() { em }: Context
  ) {
    const bannedUser = em.assign(await em.findOne(User, bannedId), {
      banned: true,
      banReason: reason,
      servers: []
    })

    await em
      .createQueryBuilder(Post)
      .update({
        removed: true,
        removedReason: reason,
        pinned: false,
        pinRank: null
      })
      .where({ author: bannedUser })
      .execute()

    await em
      .createQueryBuilder(Comment)
      .update({
        removed: true,
        removedReason: reason,
        pinned: false,
        pinRank: null
      })
      .where({ author: bannedUser })
      .execute()

    await em.persistAndFlush([bannedUser])
    // await em.nativeDelete(Notification, { fromUser: bannedUser })
    return true
  }
}
