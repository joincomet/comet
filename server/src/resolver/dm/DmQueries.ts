import { Resolver } from 'type-graphql'
import { ChatGroup, DirectMessage } from '@/entity'

@Resolver(() => DirectMessage)
export class DmQueries {}
