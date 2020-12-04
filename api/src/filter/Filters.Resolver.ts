import { Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/user/User.Entity'
import { Planet } from '@/planet/Planet.Entity'
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
  async blockTo(@Ctx() { userId }: Context) {
    if (!userId) return []

    const blockTo = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'blockTo')
      .of(userId)
      .loadMany()

    if (blockTo.length === 0) return []

    const blockToIds = blockTo.map(u => u.id)

    return this.userRepository
      .createQueryBuilder('user')
      .whereInIds(blockToIds)
      .andWhere('user.banned = false')
      .getMany()
  }
}
