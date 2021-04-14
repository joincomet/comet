import { ArgsType, Field, ID, InputType } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Group } from '@/entity'

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
  liveQueryStore.invalidate(`Group:${groupId}`)
}
