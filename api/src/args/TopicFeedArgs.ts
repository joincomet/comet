import { ArgsType, Field } from 'type-graphql'
import { FeedArgs } from './FeedArgs'

@ArgsType()
export class TopicFeedArgs extends FeedArgs {
  @Field()
  topicName: string
}
