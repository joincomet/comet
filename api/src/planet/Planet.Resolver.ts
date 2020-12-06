import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
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
import { PlanetUser } from '@/planet/PlanetUser.Entity'
import { handleUnderscore } from '@/handleUnderscore'

@Resolver(() => Planet)
export class PlanetResolver {
  @InjectRepository(Planet) readonly planetRepository: Repository<Planet>
  @InjectRepository(User) readonly userRepository: Repository<User>
  @InjectRepository(PlanetUser)
  readonly userPlanetRepository: Repository<PlanetUser>

  @Authorized()
  @Mutation(() => Boolean)
  async createPlanet(
    @Args() { name, description, tags }: CreatePlanetArgs,
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

    const tagsToSave = []
    for (const tag of tags) {
      tagsToSave.push(tag)
    }

    await this.planetRepository.save({
      name,
      description,
      creatorId: userId
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
  async joinPlanet(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'planets')
      .of(userId)
      .add(name)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leavePlanet(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'planets')
      .of(userId)
      .remove(name)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async mutePlanet(@Arg('name') name: string, @Ctx() { userId }: Context) {
    const foundPlanet = await this.planetRepository
      .createQueryBuilder('planet')
      .where('planet.name ILIKE :planet', {
        planet: handleUnderscore(name)
      })
      .getOne()

    if (!foundPlanet) throw new Error('Planet does not exist')

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'planets')
      .of(userId)
      .remove(foundPlanet.name)

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .add(foundPlanet.name)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unmutePlanet(@Arg('name') name: string, @Ctx() { userId }: Context) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'mutedPlanets')
      .of(userId)
      .remove(name)
    return true
  }

  @Query(() => [Planet])
  async planets(
    @Args()
    { sort, joined, names, search, tags, page, pageSize }: PlanetsArgs,
    @Ctx() { userId }: Context
  ) {
    const qb = this.planetRepository.createQueryBuilder('planet')

    if (sort === PlanetSort.NEW) {
      qb.addOrderBy('planet.createdAt', 'DESC')
    } else if (sort === PlanetSort.TOP) {
      qb.addSelect('COUNT(join.userId)', 'planet_total')
        .leftJoin('planet.users', 'join')
        .addGroupBy('planet.id')
        .addOrderBy('planet_total', 'DESC')
    } else if (sort === PlanetSort.TRENDING) {
      qb.addSelect('COUNT(join.userId)', 'planet_total')
        .leftJoin(
          'planet.users',
          'join',
          "join.createdAt > NOW() - INTERVAL '1 day'"
        )
        .addGroupBy('planet.id')
        .addOrderBy('planet_total', 'DESC')
    }

    qb.addOrderBy('planet.name', 'ASC')

    if (userId && joined) {
      const sub = await this.userPlanetRepository
        .createQueryBuilder('join')
        .where(`join.userId = ${userId}`)
        .select('"join"."planet_id"')
      qb.andWhere(`planet.id = ANY((${sub.getQuery()}))`)
    }

    return qb
      .skip(page * pageSize)
      .take(pageSize)
      .getMany()
  }

  @FieldResolver()
  async joined(
    @Root() planet: Planet,
    @Ctx() { userJoinedPlanetLoader, userId }: Context
  ) {
    if (!userId) return false
    return userJoinedPlanetLoader.load({ userId, planetId: planet.id })
  }
}
