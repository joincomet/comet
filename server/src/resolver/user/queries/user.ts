import { Context } from '@/types'
import { User } from '@/entity'
import { ArgsType, Field, ID } from 'type-graphql'
import { handleUnderscore } from '@/util'

@ArgsType()
export class UserArgs {
  @Field(() => ID, { nullable: true })
  id: string

  @Field({ nullable: true })
  username: string
}

export async function user(
  { em, userId: currentUserId }: Context,
  { username, id }: UserArgs
): Promise<User> {
  em = em.fork()
  if (username && id) throw new Error('Must provide one of id or name')
  if (!id && !username) {
    // Current user
    if (!currentUserId) return null
    return em.findOne(User, currentUserId, { isDeleted: false })
  } else if (id) {
    return em.findOne(User, { id, isDeleted: false })
  } else if (username) {
    return em.findOne(User, {
      username: { $ilike: handleUnderscore(username) },
      isDeleted: false
    })
  }
}
