import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { Channel, Group, User } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { uploadImage } from '@/util/s3'
import { CheckGroupMember } from '@/util'

@Resolver()
export class GroupMutations {
  @Authorized()
  @Mutation(() => Group, { description: 'Create group with users' })
  async createGroup(
    @Ctx() { user, em }: Context,
    @Arg('usernames', () => [String]) usernames: string[],
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<Group> {
    if (usernames.length > 9) throw new Error('error.group.maxSize')
    const users = [user]
    for (const username of usernames) {
      users.push(await em.findOneOrFail(User, { username }))
    }
    const group = em.create(Group, {
      users,
      owner: user
    })
    const channel = em.create(Channel, {
      group
    })
    await em.persistAndFlush([group, channel])
    for (const u of users) await refetchGroupsAndDms(u.id)
    return group
  }

  @CheckGroupMember()
  @Mutation(() => Boolean, { description: 'Leave a group' })
  async leaveGroup(
    @Ctx() { user, em }: Context,
    @Arg('groupId', () => ID, { description: 'ID of group to leave' })
    groupId: string,
    @PubSub(SubscriptionTopic.RefetchUsers)
    refetchUsers: Publisher<string>,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<boolean> {
    const group = await em.findOneOrFail(Group, groupId, ['users'])
    group.users.remove(user)
    if (group.owner === user) group.owner = group.users.getItems()[0]
    await em.persistAndFlush(group)
    await refetchUsers(user.id)
    await refetchGroupsAndDms(user.id)
    return true
  }

  @CheckGroupMember()
  @Mutation(() => Group, { description: 'Rename a group' })
  async renameGroup(
    @Ctx() { em, user }: Context,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>,
    @Arg('groupId', () => ID, { description: 'ID of group to rename' })
    groupId: string,
    @Arg('name', {
      nullable: true,
      description:
        'New name of group, or null to use default name (list of users)'
    })
    name?: string
  ): Promise<Group> {
    const group = await em.findOneOrFail(Group, groupId, ['users'])
    group.name = name
    await em.persistAndFlush(group)
    await refetchGroupsAndDms(user.id)
    return group
  }

  @CheckGroupMember()
  @Mutation(() => Group, { description: 'Change avatar image of group' })
  async changeGroupAvatar(
    @Ctx() { em, user }: Context,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>,
    @Arg('groupId', () => ID, { description: 'ID of group to update' })
    groupId: string,
    @Arg('avatarFile', () => GraphQLUpload, {
      nullable: true,
      description: 'Avatar file upload for group, or null to remove avatar'
    })
    avatarFile?: FileUpload
  ): Promise<Group> {
    const group = await em.findOneOrFail(Group, groupId, ['users'])
    if (avatarFile) {
      group.avatarUrl = (
        await uploadImage({
          file: avatarFile,
          resize: {
            width: 256,
            height: 256
          }
        })
      ).url
    }
    await em.persistAndFlush(group)
    await refetchGroupsAndDms(user.id)
    return group
  }
}
