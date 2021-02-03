import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { LoginResponse } from '@/auth/LoginResponse'
import { Context } from '@/Context'
import { User } from '@/user/User.entity'
import { createAccessToken } from '@/auth/AuthTokens'
import * as argon2 from 'argon2'
import { handleUnderscore } from '@/handleUnderscore'
import { Planet } from '@/planet/Planet.entity'

@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponse)
  async signUp(
    @Ctx() { em }: Context,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('email', { nullable: true }) email?: string
  ) {
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

    const foundUser = await em.findOne(User, {
      username: handleUnderscore(username)
    })
    if (foundUser) throw new Error('Username taken')

    const passwordHash = await argon2.hash(password)
    const cometPlanet = await em.findOne(Planet, { name: 'Comet' })
    cometPlanet.userCount++
    const user = em.create(User, {
      username,
      passwordHash,
      lastLogin: new Date(),
      joinedPlanets: [cometPlanet],
      email: email.toLowerCase()
    })
    const accessToken = createAccessToken(user)
    await em.persistAndFlush([cometPlanet, user])
    return {
      accessToken,
      user
    } as LoginResponse
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { em }: Context,
    @Arg('password') password: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('email', { nullable: true }) email?: string
  ) {
    if (!name && !email)
      throw new Error('Must log in with either username or email')
    let user
    if (name) {
      user = await em.findOne(User, { name })
    } else if (email) {
      user = await em.findOne(User, { email: email.toLowerCase() })
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
