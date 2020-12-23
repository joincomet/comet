import { getRepository } from 'typeorm'
import { User } from '@/user/User.Entity'
import { AuthChecker } from 'type-graphql'
import { Context } from '@/Context'
import { Post } from '@/post/Post.Entity'
import { Planet } from '@/planet/Planet.Entity'

export const authChecker: AuthChecker<Context> = async (
  { root, args, context, info },
  roles
) => {
  const role = roles && roles.length > 0 ? roles[0] : null

  const { userId } = context

  if (!userId) return false

  const user = await getRepository(User)
    .createQueryBuilder('user')
    .whereInIds(context.userId)
    .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
    .getOne()

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
      const post = await getRepository(Post).findOne(args.postId)
      if (!post) return false
      return post.authorId === userId
    }
  }

  // true if planet arg is in list of moderated planets
  else if (roles.includes('MOD') && args && args.planetId)
    return !!(await user.moderatedPlanets).find(
      planet => planet.id === args.planetId
    )

  // false if no other conditions met
  return false
}
