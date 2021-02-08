import { User } from '@/user/User.entity'
import { AuthChecker } from 'type-graphql'
import { Context } from '@/Context'
import { Post } from '@/post/Post.entity'

/*
@Authorized(): must be logged in
@Authorized('ADMIN'): must be admin
@Authorized('USER'): must be same user as user being queried (i.e. email)
 */
export const authChecker: AuthChecker<Context> = async (
  { root, args, context: { userId, em }, info },
  roles
) => {
  const role = roles && roles.length > 0 ? roles[0] : null

  if (!userId) return false

  const user = await em.findOne(User, userId)

  // false if not logged in
  if (!user) return false

  // false if banned
  if (user.banned) return false

  // true if logged in and no roles specified
  if (!role) return true

  // false if needs ADMIN but is not admin
  if (role === 'ADMIN' && !user.admin) return false

  // true if admin
  if (user.admin) return true

  // fields on user only accessible to same user (i.e. email)
  if (roles.includes('USER')) {
    if (root && root.id) {
      return root.id === user.id
    }
  }

  // false if no other conditions met
  return false
}
