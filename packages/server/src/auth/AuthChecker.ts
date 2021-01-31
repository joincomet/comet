import { User } from '@/user/User.entity'
import { AuthChecker } from 'type-graphql'
import { Context } from '@/Context'
import { Post } from '@/post/Post.entity'

export const authChecker: AuthChecker<Context> = async (
  { root, args, context: { userId, em }, info },
  roles
) => {
  const role = roles && roles.length > 0 ? roles[0] : null

  if (!userId) return false

  const user = await em.findOne(User, userId, ['moderatedPlanets'])

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

  if (roles.includes('USER')) {
    if (root && root.id) {
      return root.id === user.id
    }
  } else if (roles.includes('AUTHOR')) {
    if (args && args.postId) {
      const post = await em.findOne(Post, args.postId)
      if (!post) return false
      return post.authorId === userId
    }
  }

  // true if planet arg is in list of moderated planets
  else if (roles.includes('MOD') && args && args.planetId)
    return !!user.moderatedPlanets
      .getItems()
      .map(p => p.id)
      .find(id => id === args.planetId)

  // false if no other conditions met
  return false
}
