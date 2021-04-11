import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { inGroupFilter } from '@/resolver/group/subscriptions/inGroupFilter'
import { GroupUserPayload } from '@/resolver/group/subscriptions'
import { UserJoinedGroupResponse } from '@/resolver/group/subscriptions/UserJoinedGroupResponse'
import { Channel, Group, User } from '@/entity'
import { UserLeftGroupResponse } from '@/resolver/group/subscriptions/UserLeftGroupResponse'
import { currentUserFilter } from '@/util/currentUserFilter'
import { ChannelUserPayload } from '@/resolver/channel/mutations'

@Resolver()
export class GroupSubscriptions {
  @Authorized()
  @Subscription(() => UserJoinedGroupResponse, {
    topics: SubscriptionTopic.UserJoinedGroup,
    filter: inGroupFilter
  })
  async userJoinedGroup(
    @Ctx() { em },
    @Root() { userId, groupId }: GroupUserPayload
  ): Promise<UserJoinedGroupResponse> {
    return {
      user: await em.findOneOrFail(User, userId),
      group: await em.findOneOrFail(Group, groupId)
    }
  }

  @Authorized()
  @Subscription(() => UserLeftGroupResponse, {
    topics: SubscriptionTopic.UserLeftGroup,
    filter: inGroupFilter
  })
  userLeftGroup(
    @Root() { userId, groupId }: GroupUserPayload
  ): UserLeftGroupResponse {
    return { userId, groupId }
  }

  @Authorized()
  @Subscription(() => Group, {
    topics: SubscriptionTopic.GroupUpdated,
    filter: inGroupFilter
  })
  async groupUpdated(
    @Ctx() { em },
    @Root() { groupId }: GroupUserPayload
  ): Promise<Group> {
    return em.findOneOrFail(Group, groupId)
  }

  @Authorized()
  @Subscription(() => Group, {
    topics: SubscriptionTopic.GroupRead,
    filter: currentUserFilter
  })
  async groupRead(
    @Ctx() { em }: Context,
    @Root() { groupId }: GroupUserPayload
  ): Promise<Group> {
    return em.findOneOrFail(Group, groupId)
  }
}
