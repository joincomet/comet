import { ArgsType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { LoginResponse } from '@/resolver/user'
import { Context } from '@/types'
import * as argon2 from 'argon2'
import { createAccessToken } from '@/util'

@ArgsType()
export class ChangePasswordArgs {
  @Field({ description: 'New password' })
  @Length(6)
  password: string

  @Field({ description: 'Current password for verification' })
  currentPassword: string
}

export async function changePassword(
  { em, user }: Context,
  { password, currentPassword }: ChangePasswordArgs
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
