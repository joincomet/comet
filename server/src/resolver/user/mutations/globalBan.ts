import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { User } from '@/entity'

@InputType()
export class GlobalBanInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(1, 1000)
  reason?: string
}

export async function globalBan(
  { em, user: currentUser }: Context,
  { userId, reason }: GlobalBanInput
): Promise<boolean> {
  if (!currentUser.isAdmin) throw new Error('Must be admin to global ban')
  const user = await em.findOneOrFail(User, userId)
  user.isBanned = true
  user.banReason = reason
  await em.persistAndFlush(user)
  return true
}
