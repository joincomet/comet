import { getRepository } from 'typeorm'
import { User } from '@/entities/User'
import { AuthChecker } from 'type-graphql'
import { Context } from '@/Context'
import { Post } from '@/entities/Post'
import { Community } from '@/entities/Community'

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
    .leftJoinAndSelect('user.moderatedCommunities', 'moderatedCommunity')
    .getOne()

  // false if not logged in
  if (!user) return false

  // true if logged in and no roles specified
  if (!role) return true

  // false if needs ADMIN but is not admin
  if (role === 'ADMIN' && !user.admin) return false

  // true if admin
  if (user.admin) return true

  if (roles.includes('USER')) {
    if (root && root.id) {
      return root.id === user.id
    } else if (args && args.postId) {
      const post = await getRepository(Post).findOne(args.postId)
      if (!post) return false
      return post.authorId === userId
    }
  }

  // true if community arg is in list of moderated communities
  if (roles.includes('MOD') && args && args.community)
    return !!(await user.moderatedCommunities).find(
      mod => (mod.community as Community).name === args.community
    )

  // false if no other conditions met
  return false
}
