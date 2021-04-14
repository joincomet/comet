import {ArgsType, Field, ID, InputType} from 'type-graphql'
import { IsHexColor, IsOptional, Length } from 'class-validator'
import { Role, ServerPermission } from '@/entity'
import { Context } from '@/types'

@InputType()
export class UpdateRoleInput {
  @Field(() => ID)
  roleId: string

  @Field({ nullable: true })
  @Length(1, 100)
  @IsOptional()
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  color?: string

  @Field(() => [ServerPermission], { nullable: true })
  permissions?: ServerPermission[]

  @Field(() => ID, { nullable: true })
  addedUserId: string

  @Field(() => ID, { nullable: true })
  removedUserId: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => ID, { nullable: true })
  beforeRoleId?: string
}

export async function updateRole(
  { em, user, liveQueryStore }: Context,
  {
    roleId,
    name,
    color,
    permissions,
    addedUserId,
    removedUserId,
    isDeleted,
    beforeRoleId
  }: UpdateRoleInput
): Promise<Role> {
  liveQueryStore.invalidate(`Server:${}`)
}
