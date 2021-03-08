import { ResolverFilterData } from 'type-graphql'
import { Context } from '@/types'

export type SubscriptionFilter<T> = ResolverFilterData<T, any, Context>
