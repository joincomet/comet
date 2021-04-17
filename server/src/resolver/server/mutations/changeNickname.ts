import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'

@InputType()
export class ChangeNicknameInput {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @Length(1, 1000)
  nickname?: string
}
