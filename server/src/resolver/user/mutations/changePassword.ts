import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { LoginResponse } from '@/resolver/user'
import { Context } from '@/types'
import * as argon2 from 'argon2'
import { createAccessToken } from '@/util'

@InputType()
export class ChangePasswordInput {
  @Field()
  @Length(6)
  password: string

  @Field()
  currentPassword: string
}

export async function changePassword(
  { em, user }: Context,
  { password, currentPassword }: ChangePasswordInput
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
