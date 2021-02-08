import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Planet } from '@/planet/Planet.entity'
import { Context } from '@/Context'
import { User } from '@/user/User.entity'
import { PlanetsArgs } from '@/planet/PlanetsArgs'
import { PlanetSort } from '@/planet/PlanetSort'
import { handleUnderscore } from '@/handleUnderscore'
import { ChatChannel } from '@/chat/ChatChannel.entity'
import { PlanetsResponse } from '@/planet/PlanetsResponse'
import { QueryOrder } from '@mikro-orm/core'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/S3Storage'

@Resolver(() => Planet)
export class PlanetResolver {
  @Authorized()
  @Mutation(() => Planet)
  async createPlanet(
    @Ctx() { userId, em }: Context,
    @Arg('name') name: string,
    @Arg('avatarFile', () => GraphQLUpload, { nullable: true })
    avatarFile?: FileUpload
  ): Promise<Planet> {
    const user = await em.findOne(User, userId, ['planets'])
    if (user.planets.length >= 100)
      throw new Error('Cannot join more than 100 planets')

    const channel = em.create(ChatChannel, {
      name: 'general'
    })

    let avatarUrl = null
    if (avatarFile) {
      const { createReadStream, mimetype } = await avatarFile
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
        throw new Error('Image must be PNG or JPEG')
      avatarUrl = await uploadImage(createReadStream(), avatarFile.mimetype, {
        width: 256,
        height: 256
      })
    }

    const planet = em.create(Planet, {
      name,
      owner: user,
      moderators: [user],
      users: [user],
      userCount: 1,
      channels: [channel],
      avatarUrl
    })
    await em.persistAndFlush([planet, channel])
    return planet
  }

  @Query(() => Planet, { nullable: true })
  async planet(@Arg('name') name: string, @Ctx() { em }: Context) {
    return em.findOne(Planet, { name: { $ilike: handleUnderscore(name) } }, [
      'moderators',
      'users',
      'channels'
    ])
  }

  @Authorized()
  @Mutation(() => Boolean)
  async joinPlanet(
    @Arg('planetId', () => ID) planetId: string,
    @Ctx() { userId, em }: Context
  ) {
    const user = await em.findOne(User, userId, ['planets'])
    if (user.planets.length >= 100)
      throw new Error('Cannot join more than 100 planets')

    const planet = await em.findOne(Planet, planetId)
    planet.users.add(user)
    planet.userCount++
    await em.persistAndFlush(planet)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leavePlanet(
    @Arg('planetId', () => ID) planetId: string,
    @Ctx() { userId, em }: Context
  ) {
    const planet = await em.findOne(Planet, planetId)
    const user = await em.findOne(User, userId)
    planet.users.remove(user)
    planet.userCount--
    await em.persistAndFlush(planet)
    return true
  }

  @Query(() => PlanetsResponse)
  async planets(
    @Args()
    { sort, joinedOnly, galaxy, page, pageSize }: PlanetsArgs,
    @Ctx() { userId, em }: Context
  ) {
    const user = await em.findOne(User, userId, ['planets'])

    let where = {}
    let orderBy = {}

    if (sort === PlanetSort.FEATURED || (!userId && joinedOnly)) {
      where = { featured: true }
      orderBy = { featuredPosition: QueryOrder.ASC }
    } else if (galaxy) {
      where = { galaxy }
      orderBy = { name: QueryOrder.ASC }
    }

    if (sort === PlanetSort.NEW) {
      orderBy = { createdAt: QueryOrder.DESC }
    } else if (sort === PlanetSort.TOP) {
      orderBy = { userCount: QueryOrder.DESC }
    } else if (sort === PlanetSort.AZ) {
      orderBy = { name: QueryOrder.ASC }
    }

    if (userId && joinedOnly) {
      where = { id: user.planets.getItems(false) }
    }

    const planets = await em.find(
      Planet,
      where,
      [],
      orderBy,
      pageSize,
      page * pageSize
    )

    return {
      planets,
      page,
      nextPage: page >= 0 && planets.length >= pageSize ? page + 1 : null
    } as PlanetsResponse
  }
}
