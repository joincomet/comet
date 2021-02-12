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
import { Channel } from '@/chat/Channel.entity'
import { PlanetsResponse } from '@/planet/PlanetsResponse'
import { QueryOrder } from '@mikro-orm/core'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/S3Storage'
import { Group } from '@/chat/Group.entity'
import { Folder } from '@/folder/Folder.entity'

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

    const channel = em.create(Channel, {
      name: 'general'
    })

    em.persist(channel)

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
      channelsSort: [channel.id],
      avatarUrl
    })
    await em.persistAndFlush(planet)
    return planet
  }

  @Mutation(() => Channel)
  async createChannel(
    @Ctx() { userId, em }: Context,
    @Arg('planetId', () => ID) planetId: string,
    @Arg('name') name: string,
    @Arg('modOnly', { defaultValue: false }) modOnly: boolean = false
  ) {
    const user = await em.findOne(User, userId)
    const planet = await em.findOne(Planet, planetId, ['moderators'])
    if (!planet.moderators.contains(user))
      throw new Error('You are not a moderator')

    const channel = em.create(Channel, {
      name,
      planet,
      modOnly
    })

    await em.persistAndFlush(channel)
    return channel
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
    user.planetsSort.push(planet.id)
    await em.persistAndFlush([planet, user])
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
    user.planetsSort = user.planetsSort.filter(id => id !== planet.id)
    await em.persistAndFlush([planet, user])
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
