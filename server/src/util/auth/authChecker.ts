import { AuthChecker } from 'type-graphql'
import { Context } from '@/types'
import { User } from '@/entity'

/*
@Authorized(): must be logged in
@Authorized('ADMIN'): must be admin
@Authorized('USER'): must be same user as user being queried (i.e. email)
 */

export const authChecker: AuthChecker<Context> = (
  { root, context: { user } },
  roles
): boolean => {
  if (!user) return false
  if (!roles || roles.length === 0) return true

  if (user.isAdmin) return true

  if (roles[0] === 'ADMIN') return user.isAdmin

  if (roles[0] === 'USER') {
    if (!root || !(root instanceof User))
      throw new Error('error.invalidUserAuth')

    return user === root
  }

  return false
}
