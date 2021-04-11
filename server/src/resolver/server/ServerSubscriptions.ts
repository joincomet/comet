import { Authorized, Resolver, Subscription } from 'type-graphql'
import { Server } from '@/entity'
import { SubscriptionTopic } from '@/types'

@Resolver(() => Server)
export class ServerSubscriptions {}
