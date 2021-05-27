import { Context } from '@/types'
import { Field, InputType } from 'type-graphql'
import { User } from '@/entity'
import * as argon2 from 'argon2'
import { CustomError } from '@/types/CustomError'
import {createAccessToken, handleUnderscore, logger} from '@/util'
import { LoginResponse } from '@/resolver/user/mutations/LoginResponse'
import { createLoaders } from '@/util/loaders'
import { GraphQLEmailAddress } from 'graphql-scalars'

@InputType()
export class LoginInput {
  @Field(() => GraphQLEmailAddress, { nullable: true })
  email?: string

  @Field({ nullable: true })
  username?: string

  @Field()
  password: string
}

export async function login(
  ctx: Context,
  { email, username, password }: LoginInput
): Promise<LoginResponse> {
  logger('login')
  const { em, liveQueryStore } = ctx

  if (!email && !username) throw new Error('Must provide email or username')
  if (!!email && !!username)
    throw new Error('Must provide only one of email or username')
  let user: User
  if (email) {
    user = await em.findOne(User, {
      email: { $ilike: handleUnderscore(email.toLowerCase()) },
      isDeleted: false
    })
  } else if (username) {
    user = await em.findOne(User, {
      username: { $ilike: handleUnderscore(username) },
      isDeleted: false
    })
  }
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
  const accessToken = createAccessToken(user)
  ctx.userId = user.id
  ctx.loaders = createLoaders(em, user.id)
  return {
    accessToken,
    user
  } as LoginResponse
}
