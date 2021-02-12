import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { LoginResponse } from '@/auth/LoginResponse'
import { Context } from '@/Context'
import { User } from '@/user/User.entity'
import { createAccessToken } from '@/auth/AuthTokens'
import * as argon2 from 'argon2'
import { handleUnderscore } from '@/handleUnderscore'
import { Planet } from '@/planet/Planet.entity'
import { customAlphabet } from 'nanoid'
import isEmail from 'validator/lib/isEmail'
import { Folder } from '@/folder/Folder.entity'

const tagGenerator = customAlphabet('0123456789', 4)

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponse)
  async signUp(
    @Ctx() { em }: Context,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email', { nullable: true }) email?: string
  ) {
    if (email && !isEmail(email.toLowerCase()))
      throw new Error('Invalid email address')

    username = username
      .replace(/ +(?= )/g, '') // remove repeated spaces
      .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width characters
      .trim() // remove leading and trailing whitespace
    if (username.length < 2 || username.length > 32)
      throw new Error('Username must be 2-32 characters')

    const bannedSubstrings = ['@', '#', ':', '```']

    for (const s of bannedSubstrings) {
      if (username.includes(s))
        throw new Error(`Username cannot contain '${s}'`)
    }

    if (email) {
      const foundUser = await em.findOne(User, {
        email: handleUnderscore(email.toLowerCase())
      })
      if (foundUser) throw new Error('Email already in use')
    }

    const passwordHash = await argon2.hash(password)

    let tag = tagGenerator()

    while (
      await em.findOne(User, {
        $and: [{ username: { $ilike: handleUnderscore(username) } }, { tag }]
      })
    ) {
      tag = tagGenerator()
    }

    const user = em.create(User, {
      username,
      tag,
      passwordHash,
      lastLogin: new Date(),
      email: email.toLowerCase()
    })
    const accessToken = createAccessToken(user)

    const favoritesFolder = em.create(Folder, {
      name: 'Favorites',
      owner: user
    })

    const readLaterFolder = em.create(Folder, {
      name: 'Read Later',
      owner: user
    })
    user.folders.add(favoritesFolder, readLaterFolder)
    user.foldersSort = [favoritesFolder.id, readLaterFolder.id]
    await em.persistAndFlush([favoritesFolder, readLaterFolder])

    return {
      accessToken,
      user
    } as LoginResponse
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { em }: Context,
    @Arg('name') name: string,
    @Arg('password') password: string
  ) {
    const usernameRegex = /^[^#]{2,32}#\d{4}$/
    let user
    if (usernameRegex.test(name)) {
      // username#tag
      const split = name.split('#')
      const username = split[0]
      const tag = split[1]
      user = await em.findOne(User, {
        $and: [{ username: { $ilike: handleUnderscore(username) } }, { tag }]
      })
    } else if (isEmail(name.toLowerCase())) {
      // email
      user = await em.findOne(User, {
        email: handleUnderscore(name.toLowerCase())
      })
    } else {
      throw new Error('Must log in with email or username#tag')
    }
    if (!user) throw new Error('Invalid Login')
    if (user.banned) throw new Error('Banned: ' + user.banReason)
    const match = await argon2.verify(user.passwordHash, password)
    if (!match) throw new Error('Invalid Login')
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
  async changePassword(
    @Arg('oldPassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { userId, em }: Context
  ) {
    const user = await em.findOne(User, userId)
    const match = await argon2.verify(user.passwordHash, oldPassword)
    if (!match) throw new Error('Current password incorrect!')

    user.passwordHash = await argon2.hash(newPassword)
    await em.persistAndFlush(user)
    return {
      accessToken: createAccessToken(user),
      user
    } as LoginResponse
  }
}
