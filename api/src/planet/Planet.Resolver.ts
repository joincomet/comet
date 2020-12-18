import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { CreatePlanetArgs } from '@/planet/CreatePlanetArgs'
import { Planet } from '@/planet/Planet.Entity'
import { Context } from '@/Context'
import { User } from '@/user/User.Entity'
import { bannedWords } from '@/BannedWords'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { PlanetsArgs } from '@/planet/PlanetsArgs'
import { PlanetSort } from '@/planet/PlanetSort'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => Planet)
export class PlanetResolver {
  @InjectRepository(Planet) readonly planetRepository: Repository<Planet>
  @InjectRepository(User) readonly userRepository: Repository<User>

  @Authorized()
  @Mutation(() => Boolean)
  async createPlanet(
    @Args() { name, description, galaxies }: CreatePlanetArgs,
    @Ctx() { userId }: Context
  ) {
    bannedWords.forEach(u => {
      if (name.toLowerCase().includes(u.toLowerCase())) {
        throw new Error('Inappropriate Planet Name')
      }
    })

    const foundPlanet = await this.planetRepository
      .createQueryBuilder('planet')
      .where('planet.name ILIKE :name', { name: handleUnderscore(name) })
      .getOne()

    if (foundPlanet) throw new Error('Planet already exists')

    const user = await this.userRepository
      .createQueryBuilder('user')
      .whereInIds(userId)
      .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
      .getOne()
    if ((await user.moderatedPlanets).length >= 3)
      throw new Error('Cannot moderate more than 3 planets')

    await this.planetRepository.save({
      name,
      description,
      creatorId: userId,
      galaxies
    })

    return true
  }

  @Query(() => Planet, { nullable: true })
  async planet(@Arg('name') name: string, @Ctx() { userId }: Context) {
    const qb = this.planetRepository
      .createQueryBuilder('planet')
      .andWhere('planet.name ILIKE :name', {
        name: handleUnderscore(name)
      })
      .leftJoinAndSelect('planet.moderators', 'moderator')
    return qb.getOne()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'joinedPlanets')
      .of(userId)
      .add(planetId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leavePlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'joinedPlanets')
      .of(userId)
      .remove(planetId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async mutePlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .add(planetId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unmutePlanet(
    @Arg('planetId', () => ID) planetId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .remove(planetId)
    return true
  }

  @Query(() => [Planet])
  async planets(
    @Args()
    { sort, joinedOnly, search, galaxies }: PlanetsArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.planetRepository.createQueryBuilder('planet')

    if (sort === PlanetSort.NEW) {
      qb.addOrderBy('planet.createdAt', 'DESC')
    } else if (sort === PlanetSort.TOP) {
      qb.addOrderBy('planet.userCount', 'DESC')
    } else if (sort === PlanetSort.AZ) {
      qb.addOrderBy('planet.name', 'ASC')
    }

    if (userId && joinedOnly) {
      const user = await this.userRepository.findOne(userId)
      const joinedPlanets = (await user.joinedPlanets).map(p => p.id)
      qb.andWhere(`planet.id = ANY(:joinedPlanets)`, { joinedPlanets })
    }

    return qb.getMany()
  }

  @FieldResolver()
  async isJoined(
    @Root() planet: Planet,
    @Ctx() { joinedLoader, userId }: Context
  ) {
    if (!userId) return false
    return joinedLoader.load({ userId, planetId: planet.id })
  }
}
