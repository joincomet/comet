import { Field, ID, InputType } from 'type-graphql'
import { ChatMessage } from '@/chat/ChatMessage.Entity'

@InputType()
export class MessageInput implements Partial<ChatMessage> {
  @Field(() => ID)
  channelId: number

  @Field()
  text: string
}
