import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { Group } from '@/entity'
import { CreateGroupArgs } from '@/resolver/group/mutations/createGroup'
import { createGroup } from '@/resolver/group/mutations/createGroup'
import { GroupUserPayload } from '@/resolver/group/subscriptions/GroupUserPayload'
import { leaveGroup } from '@/resolver/group/mutations/leaveGroup'
import { EditGroupArgs } from '@/resolver/group/mutations/editGroup'
import { editGroup } from '@/resolver/group/mutations/editGroup'
import { readGroup } from '@/resolver/group/mutations'

@Resolver()
export class GroupMutations {
  @Authorized()
  @Mutation(() => Group)
  async createGroup(
    @Ctx() ctx: Context,
    @Args() args: CreateGroupArgs,
    @PubSub(SubscriptionTopic.UserJoinedGroup)
    notifyUserJoinedGroup: Publisher<GroupUserPayload>
  ): Promise<Group> {
    return createGroup(ctx, args, notifyUserJoinedGroup)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveGroup(
    @Ctx() ctx: Context,
    @Arg('groupId', () => ID)
    groupId: string,
    @PubSub(SubscriptionTopic.UserLeftGroup)
    notifyUserLeftGroup: Publisher<GroupUserPayload>
  ): Promise<boolean> {
    return leaveGroup(ctx, groupId, notifyUserLeftGroup)
  }

  @Authorized()
  @Mutation(() => Group)
  async editGroup(
    @Ctx() ctx: Context,
    @Args() args: EditGroupArgs,
    @PubSub(SubscriptionTopic.GroupUpdated)
    notifyGroupUpdated: Publisher<{ groupId: string }>
  ): Promise<Group> {
    return editGroup(ctx, args, notifyGroupUpdated)
  }

  @Authorized()
  @Mutation(() => Group)
  async readGroup(
    @Ctx() ctx: Context,
    @Arg('groupId', () => ID) groupId: string,
    @PubSub(SubscriptionTopic.GroupRead)
    notifyGroupRead: Publisher<GroupUserPayload>
  ): Promise<Group> {
    return readGroup(ctx, groupId, notifyGroupRead)
  }
}
