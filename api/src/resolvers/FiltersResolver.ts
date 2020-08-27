import { Ctx, Query, Resolver } from 'type-graphql'
import { RepositoryInjector } from '../RepositoryInjector'
import { Context } from '../Context'
import { User } from '../entities/User'
import { Planet } from '../entities/Planet'

@Resolver()
export class FiltersResolver extends RepositoryInjector {
  @Query(() => [Planet])
  async mutedPlanets(@Ctx() { userId }: Context) {
    if (!userId) return []

    const planets = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .loadMany()

    planets.forEach((planet) => (planet.muted = true))

    return planets
  }

  @Query(() => [User])
  async blockedUsers(@Ctx() { userId }: Context) {
    if (!userId) return []

    const blockedUsers = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'blockedUsers')
      .of(userId)
      .loadMany()

    if (blockedUsers.length === 0) return []

    const blockedUsersIds = blockedUsers.map((u) => u.id)

    const users = await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(blockedUsersIds)
      .andWhere('user.banned = false')
      .loadRelationCountAndMap('user.followerCount', 'user.followers')
      .loadRelationCountAndMap(
        'user.commentCount',
        'user.comments',
        'comment',
        (qb) => {
          return qb
            .andWhere('comment.deleted = false')
            .andWhere('comment.removed = false')
        }
      )
      .loadRelationCountAndMap('user.postCount', 'user.posts', 'post', (qb) => {
        return qb
          .andWhere('post.deleted = false')
          .andWhere('post.removed = false')
      })
      .getMany()

    users.forEach((user) => (user.isBlocking = true))

    return users
  }
}
