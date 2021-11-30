import { Field, InputType } from 'type-graphql'
import { MinLength } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'
import * as argon2 from 'argon2'
import {logger} from "@/util";

@InputType()
export class ChangePasswordInput {
  @Field()
  @MinLength(6)
  password: string

  @Field()
  currentPassword: string
}

export async function changePassword(
  { em, userId }: Context,
  { password, currentPassword }: ChangePasswordInput
): Promise<User> {
  logger('changePassword')
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, currentPassword)
  if (!match) throw new Error('error.login.wrongPassword')
  user.passwordHash = await argon2.hash(password)
  await em.persistAndFlush(user)
  return user
}
