import { ResolverFilterData } from 'type-graphql'
import { Context } from '@/types/index'

export type SubscriptionFilter<T> = ResolverFilterData<T, any, Context>
