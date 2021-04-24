import { Context } from '@/types'
import { User } from '@/entity'
import { Field, InputType } from 'type-graphql'
import * as argon2 from 'argon2'

@InputType()
export class DeleteAccountInput {
  @Field()
  password: string
}

export async function deleteAccount(
  { em, userId, res }: Context,
  { password }: DeleteAccountInput
): Promise<boolean> {
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, password)
  if (!match) throw new Error('error.login.wrongPassword')
  user.isDeleted = true
  await em.persistAndFlush(user)
  res.clearCookie('token')
  return true
}
