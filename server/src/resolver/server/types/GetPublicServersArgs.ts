import { ArgsType, Field, Int } from 'type-graphql'
import { GetPublicServersSort, ServerCategory } from '@/resolver/server'
import { Max, Min } from 'class-validator'

@ArgsType()
export class GetPublicServersArgs {
  @Field(() => GetPublicServersSort, { defaultValue: 'Top' })
  sort: GetPublicServersSort = GetPublicServersSort.Top

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory
}
