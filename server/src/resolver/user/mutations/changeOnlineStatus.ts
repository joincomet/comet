import { Field, InputType } from 'type-graphql'
import { OnlineStatus } from '@/entity'

@InputType()
export class ChangeOnlineStatusInput {
  @Field(() => OnlineStatus)
  onlineStatus: OnlineStatus
}
