import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { ChatChannel, DirectMessage, User } from '@/entity'

@Resolver()
export class DmMutations {
  @Authorized()
  @Mutation(() => Boolean)
  async createDM(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID) userId: string
  ) {
    const user2 = await em.findOneOrFail(User, userId)
    let dm = await em.findOne(DirectMessage, {
      $or: [
        { user1: user, user2 },
        { user1: user2, user2: user }
      ]
    })
    if (dm) throw new Error('Direct message already exists')
    dm = em.create(DirectMessage, {
      user1: user,
      user2
    })
    const channel = em.create(ChatChannel, { directMessage: dm })
    dm.channel = channel
    await em.persistAndFlush([dm, channel])
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async hideDM(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID) userId: string
  ) {
    const user2 = await em.findOneOrFail(User, userId)
    const dm = await em.findOne(DirectMessage, {
      $or: [
        { user1: user, user2 },
        { user1: user2, user2: user }
      ]
    })
    if (!dm) return true

    if (dm.user1 === user) dm.isHiddenByUser1 = true
    else if (dm.user2 === user) dm.isHiddenByUser2 = true
    await em.persistAndFlush(dm)
    return true
  }
}
