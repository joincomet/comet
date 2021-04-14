import { ArgsType, Field, ID, InputType, Int } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { Server, ServerCategory } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context, NotificationSetting } from '@/types'

@InputType()
export class UpdateServerInput {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 100)
  name?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  isPublic?: boolean

  @Field({ nullable: true })
  isFeatured?: boolean

  @Field(() => Int, { nullable: true })
  featuredPosition?: number

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => ID, { nullable: true })
  banUserId?: string

  @Field({ defaultValue: false })
  purge: boolean = false

  @Field(() => ID, { nullable: true })
  unbanUserId?: string

  @Field(() => ID, { nullable: true })
  kickUserId?: string

  @Field(() => ID, { nullable: true })
  ownerId?: string

  @Field(() => ID, { nullable: true })
  beforeServerId?: string

  @Field({ nullable: true })
  @Length(1, 1000)
  @IsOptional()
  nickname?: string

  @Field(() => NotificationSetting, { nullable: true })
  notificationSetting?: NotificationSetting

  @Field({ defaultValue: false })
  isRead: boolean = false

  @Field(() => ID, { nullable: true })
  systemMessagesChannelId?: string

  @Field({ nullable: true })
  sendWelcomeMessage: boolean
}

export async function updateServer(
  { em, user, liveQueryStore }: Context,
  {
    serverId,
    name,
    description,
    isPublic,
    category,
    avatarFile,
    bannerFile,
    banUserId,
    beforeServerId,
    featuredPosition,
    isFeatured,
    kickUserId,
    isDeleted,
    ownerId,
    unbanUserId,
    nickname,
    notificationSetting,
    isRead,
    systemMessagesChannelId,
    sendWelcomeMessage
  }: UpdateServerInput
): Promise<Server> {
  liveQueryStore.invalidate(`Query.getJoinedServers(id:"${user.id}")`)
}
