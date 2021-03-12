import {
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { ChatGroup, DirectMessage, User } from '@/entity'
import { GroupDmUnion } from '@/resolver/user/types/GroupDmUnion'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => User)
export class UserQueries {
  @Query(() => User, {
    nullable: true,
    description: 'Returns the currently logged in user, or null'
  })
  async getCurrentUser(@Ctx() { user, em }: Context) {
    if (!user) {
      return null
    }

    if (user.isBanned)
      throw new Error(`Banned${user.banReason ? `: ${user.banReason}` : ''}`)

    user.lastLogin = new Date()
    await em.persistAndFlush(user)
    return user
  }

  @Authorized()
  @Query(() => [GroupDmUnion], {
    description:
      'Get list of groups and DMs, sorted by latest activity (updatedAt)'
  })
  async getGroupsAndDms(
    @Ctx() { user, em }: Context
  ): Promise<Array<typeof GroupDmUnion>> {
    await em.populate(user, ['groups.users', 'groups.channel'])
    const groups = user.groups.getItems()
    const dms = await em.find(
      DirectMessage,
      { $or: [{ user1: user }, { user2: user }] },
      ['user1', 'user2', 'channel'],
      { updatedAt: QueryOrder.DESC }
    )
    const arr: (ChatGroup | DirectMessage)[] = [].concat(groups).concat(dms)
    return arr.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
  }

  @FieldResolver(() => Boolean)
  async isCurrentUser(
    @Root() user: User,
    @Ctx() { user: currentUser }: Context
  ) {
    return currentUser && user.id === currentUser.id
  }
}
