import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { User, Server } from '@/entity'

@Resolver(() => User)
export class UserQueries {
  @Query(() => User, { nullable: true })
  async getCurrentUser(@Ctx() { user, em }: Context) {
    if (!user) {
      return null
    }
    user.lastLogin = new Date()
    await em.persistAndFlush(user)

    return user
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(
    @Root() user: User,
    @Ctx() { user: currentUser }: Context
  ) {
    return currentUser && user.id === currentUser.id
  }
}
