import { Resolver } from 'type-graphql'
import { Group, DirectMessage } from '@/entity'

@Resolver(() => DirectMessage)
export class DmQueries {}
