import { Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/entities/User'
import { Planet } from '@/entities/Planet'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class FiltersResolver {
  @InjectRepository(User) readonly userRepository: Repository<User>

  @Query(() => [Planet])
  async mutedPlanets(@Ctx() { userId }: Context) {
    if (!userId) return []

    const planets = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .loadMany()

    planets.forEach(planet => (planet.muted = true))

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

    const blockedUsersIds = blockedUsers.map(u => u.id)

    return this.userRepository
      .createQueryBuilder('user')
      .whereInIds(blockedUsersIds)
      .andWhere('user.banned = false')
      .getMany()
  }
}
