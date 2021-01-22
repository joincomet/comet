import { Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/Context'
import { User } from '@/user/User.Entity'
import { Planet } from '@/planet/Planet.Entity'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'

@Resolver()
export class FiltersResolver {
  @InjectRepository(User) readonly userRepo: Repository<User>

  @Query(() => [Planet])
  async mutedPlanets(@Ctx() { userId }: Context) {
    if (!userId) return []

    const planets = await this.userRepo
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .loadMany()

    planets.forEach(planet => (planet.muted = true))

    return planets
  }

  @Query(() => [User])
  async blockedUser(@Ctx() { userId }: Context) {
    if (!userId) return []

    const blocking = await this.userRepo
      .createQueryBuilder()
      .relation(User, 'blocking')
      .of(userId)
      .loadMany()

    if (blocking.length === 0) return []

    const blockingIds = blocking.map(u => u.id)

    return this.userRepo
      .createQueryBuilder('user')
      .whereInIds(blockingIds)
      .andWhere('user.banned = false')
      .getMany()
  }
}
