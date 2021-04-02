import { ArgsType, Field, Int } from 'type-graphql'
import { GetPublicServersSort, ServerCategory } from '@/resolver/server'
import { Max, Min } from 'class-validator'

@ArgsType()
export class GetPublicServersArgs {
  @Field(() => GetPublicServersSort, { defaultValue: 'AZ' })
  sort: GetPublicServersSort = GetPublicServersSort.AZ

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => Int, { nullable: true })
  @Min(0)
  page?: number

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  pageSize = 20
}
