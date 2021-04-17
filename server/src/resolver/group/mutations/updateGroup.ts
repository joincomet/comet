import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Group } from '@/entity'
import { uploadImageSingle } from '@/util'

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
  { em, user, liveQueryStore }: Context,
  { groupId, name, avatarFile }: UpdateGroupInput
): Promise<Group> {
  const group = await em.findOneOrFail(Group, groupId)
  await user.checkInGroup(em, groupId)
  em.assign(group, {
    name: name ?? group.name,
    avatarUrl: avatarFile
      ? await uploadImageSingle(avatarFile, { width: 256, height: 256 })
      : group.avatarUrl
  })
  await em.persistAndFlush(group)
  liveQueryStore.invalidate(`Group:${groupId}`)
  return group
}
