import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { User } from '@/entity'
import { currentUserFilter } from '@/util/currentUserFilter'
import { FriendStatusChangedPayload } from '@/resolver/user/subscriptions/FriendStatusChangedPayload'
import { FriendStatusChangedResponse } from '@/resolver/user/subscriptions/FriendStatusChangedResponse'

@Resolver()
export class UserSubscriptions {
  @Authorized()
  @Subscription(() => User, { topics: SubscriptionTopic.UserUpdated })
  async userUpdated(
    @Ctx() { em }: Context,
    @Root() { userId }: { userId: string }
  ): Promise<User> {
    return em.findOneOrFail(User, userId)
  }

  @Authorized()
  @Subscription(() => FriendStatusChangedResponse, {
    topics: SubscriptionTopic.FriendStatusChanged,
    filter: currentUserFilter
  })
  async friendStatusChanged(
    @Ctx() { em }: Context,
    @Root() { friendId, status }: FriendStatusChangedPayload
  ): Promise<FriendStatusChangedResponse> {
    return {
      user: await em.findOneOrFail(User, friendId),
      status
    }
  }
}
