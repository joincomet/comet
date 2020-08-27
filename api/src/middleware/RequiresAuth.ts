import { MiddlewareFn } from 'type-graphql'
import { Context } from '../Context'
import { getRepository } from 'typeorm'
import { User } from '../entities/User'

export const RequiresAuth: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  if (!context.userId) {
    throw new Error('Not Authenticated')
  }
  const userRepo = await getRepository(User)
  const user = await userRepo.findOne(context.userId)
  if (!user) {
    throw new Error('Not Authenticated')
  }
  if (user.banned) {
    throw new Error('Banned: ' + user.banReason)
  }
  return next()
}
