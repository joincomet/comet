import { ArgsType, Field } from 'type-graphql'
import { FeedArgs } from '@/args/FeedArgs'

@ArgsType()
export class TopicFeedArgs extends FeedArgs {
  @Field()
  topicName: string
}
