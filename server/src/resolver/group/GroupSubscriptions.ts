import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'
import { inGroupFilter } from '@/resolver/group/subscriptions/inGroupFilter'
import { GroupUserPayload } from '@/resolver/group/subscriptions'
import { UserJoinedGroupResponse } from '@/resolver/group/subscriptions/UserJoinedGroupResponse'
import { Group, User } from '@/entity'
import { UserLeftGroupResponse } from '@/resolver/group/subscriptions/UserLeftGroupResponse'
import { currentUserFilter } from '@/util/currentUserFilter'

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
      groupId
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
  @Subscription(() => ID, {
    topics: SubscriptionTopic.GroupRead,
    filter: currentUserFilter
  })
  groupRead(@Root() { groupId }: GroupUserPayload): string {
    return groupId
  }

  @Authorized()
  @Subscription(() => Group, {
    topics: SubscriptionTopic.GroupsUpdated,
    filter: currentUserFilter
  })
  async addedToGroup(
    @Ctx() { em },
    @Root() { groupId }: GroupUserPayload
  ): Promise<Group> {
    return em.findOneOrFail(Group, groupId, ['users'])
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.RemovedFromGroup,
    filter: currentUserFilter
  })
  removedFromGroup(@Root() { groupId }: GroupUserPayload): string {
    return groupId
  }
}
