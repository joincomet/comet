import { Field, ID, InputType } from 'type-graphql'
import { Message } from '@/chat/Message.entity'

@InputType()
export class MessageInput implements Partial<Message> {
  @Field(() => ID)
  channelId: string

  @Field()
  text: string
}
