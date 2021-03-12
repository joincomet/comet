import { Resolver } from 'type-graphql'
import { ChatChannel } from '@/entity'

@Resolver(() => ChatChannel)
export class ChannelQueries {}
