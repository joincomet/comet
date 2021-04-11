import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { IsOptional, Length } from 'class-validator'
import { Context } from '@/types'
import { Group } from '@/entity'
import { uploadImageSingle } from '@/util'

@ArgsType()
export class EditGroupArgs {
  @Field(() => ID)
  groupId: string

  @Field({ nullable: true })
  @Length(1, 100)
  @IsOptional()
  name?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}

export async function editGroup(
  { em, user }: Context,
  { groupId, name, avatarFile }: EditGroupArgs,
  notifyGroupUpdated: Publisher<{ groupId: string }>
): Promise<Group> {
  const group = await em.findOneOrFail(Group, groupId)
  em.assign(group, {
    name: name ?? group.name,
    avatarUrl: avatarFile
      ? await uploadImageSingle(avatarFile, { width: 256, height: 256 })
      : group.avatarUrl
  })
  await em.persistAndFlush(group)
  await notifyGroupUpdated({ groupId: group.id })
  return group
}
