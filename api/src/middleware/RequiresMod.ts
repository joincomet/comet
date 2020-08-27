import { MiddlewareFn } from 'type-graphql'
import { Context } from '../Context'
import { getRepository } from 'typeorm'
import { User } from '../entities/User'

export const RequiresMod: MiddlewareFn<Context> = async (
  { context, args },
  next
) => {
  if (!context.userId) {
    throw new Error('Not Authenticated')
  }
  const userRepo = await getRepository(User)
  const user = await userRepo
    .createQueryBuilder('user')
    .whereInIds(context.userId)
    .leftJoinAndSelect('user.moderatedPlanets', 'moderatedPlanet')
    .getOne()
  if (!user) throw new Error('Not logged in')

  if (
    !user.admin &&
    !(await user.moderatedPlanets).find((p) => p.name === args.planetName)
  )
    throw new Error('Not a moderator of ' + args.planetName)
  return next()
}
