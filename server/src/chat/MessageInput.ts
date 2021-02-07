import { Field, ID, InputType } from 'type-graphql'
import { ChatMessage } from '@/chat/ChatMessage.entity'

@InputType()
export class MessageInput implements Partial<ChatMessage> {
  @Field(() => ID)
  channelId: string

  @Field()
  text: string
}
