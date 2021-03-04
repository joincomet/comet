import { ResolverFilterData } from 'type-graphql'
import { Context } from '@/types/Context'

export type Filter<T> = ResolverFilterData<T, any, Context>
