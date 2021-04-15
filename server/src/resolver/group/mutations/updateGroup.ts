import { Field, ID, InputType } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Group, GroupUser, User } from '@/entity'
import { uploadImageSingle } from '@/util'

@InputType()
export class UpdateGroupInput {
  @Field(() => ID)
  groupId: string

  @Field(() => ID, { nullable: true })
  removedUserId?: string

  @Field(() => ID, { nullable: true })
  addedUserId?: string

  @Field({ nullable: true })
  isRead?: boolean

  @Field({ nullable: true })
  @Length(1, 100)
  @IsOptional()
  name?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function updateGroup(
  { em, user, liveQueryStore }: Context,
  {
    groupId,
    removedUserId,
    addedUserId,
    isRead,
    name,
    avatarFile
  }: UpdateGroupInput
): Promise<Group> {
  const group = await em.findOneOrFail(Group, groupId, ['users', 'owner'])
  if (!group.users.contains(user)) throw new Error('You are not in this group')

  em.assign(group, {
    name: name ?? group.name,
    avatarUrl: avatarFile
      ? await uploadImageSingle(avatarFile, { width: 256, height: 256 })
      : group.avatarUrl
  })

  if (isRead) {
    let groupUser = await em.findOne(GroupUser, { user, group })
    if (!groupUser) groupUser = em.create(GroupUser, { user, group })
    groupUser.lastViewAt = new Date()
    groupUser.unreadCount = 0
    await em.persist(groupUser)
    group.unreadCount = 0
  }

  if (removedUserId) {
    if (group.owner !== user && removedUserId !== user.id)
      throw new Error('Must be group owner to remove a user')
    const removedUser = await em.findOneOrFail(User, removedUserId)
    group.users.remove(removedUser)
  }

  if (addedUserId) {
    const addedUser = await em.findOneOrFail(User, addedUserId)
    if (group.users.contains(addedUser))
      throw new Error('That user is already in this group')
    group.users.add(addedUser)
  }
  await em.persistAndFlush(group)
  liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
