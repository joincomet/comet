import { ArgsType, Field, ID, InputType } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { RelationshipStatus, User } from '@/entity'
import { Context } from '@/types'

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => RelationshipStatus, { nullable: true })
  status?: RelationshipStatus

  @Field({ defaultValue: false })
  isBannedGlobal: boolean = false

  @Field({ defaultValue: false })
  purge: boolean = false

  @Field({ nullable: true })
  banGlobalReason?: string

  @Field({ defaultValue: false })
  isUnbannedGlobal: boolean = false

  @Field({ defaultValue: false })
  isDeactivated: boolean = false

  @Field({ nullable: true })
  isRead?: boolean
}

export async function updateUser(
  { em, user, liveQueryStore }: Context,
  {
    userId,
    isUnbannedGlobal,
    banGlobalReason,
    isBannedGlobal,
    isDeactivated,
    avatarFile,
    name,
    email,
    purge,
    status,
    isRead
  }: UpdateUserInput
): Promise<User> {
  liveQueryStore.invalidate(`User:${userId}`)
}
