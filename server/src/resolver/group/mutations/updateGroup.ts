import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Group, User } from '@/entity'
import {logger, uploadImageFileSingle} from '@/util'

@InputType()
export class UpdateGroupInput {
  @Field(() => ID)
  groupId: string

  @Field({ nullable: true })
  @Length(1, 100)
  name?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function updateGroup(
  { em, userId, liveQueryStore }: Context,
  { groupId, name, avatarFile }: UpdateGroupInput
): Promise<Group> {
  logger('updateGroup')
  const group = await em.findOneOrFail(Group, groupId, ['users'])
  if (group.users.contains(em.getReference(User, userId)))
    throw new Error('Not in group')
  em.assign(group, {
    name: name ?? group.name,
    avatarUrl: avatarFile
      ? await uploadImageFileSingle(avatarFile, { width: 256, height: 256 })
      : group.avatarUrl
  })
  await em.persistAndFlush(group)
  liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
