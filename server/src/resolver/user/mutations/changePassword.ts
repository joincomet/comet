import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import * as argon2 from 'argon2'
import { createAccessToken } from '@/util'
import { LoginResponse } from '@/resolver/user/mutations/LoginResponse'
import { User } from '@/entity'

@InputType()
export class ChangePasswordInput {
  @Field()
  @Length(6)
  password: string

  @Field()
  currentPassword: string
}

export async function changePassword(
  { em, userId }: Context,
  { password, currentPassword }: ChangePasswordInput
): Promise<LoginResponse> {
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, currentPassword)
  if (!match) throw new Error('error.login.wrongPassword')
  user.passwordHash = await argon2.hash(password)
  await em.persistAndFlush(user)
  return {
    accessToken: createAccessToken(user),
    user
  } as LoginResponse
}