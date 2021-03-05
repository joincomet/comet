import { ArgsType, Field, Int } from 'type-graphql'
import { GetServersSort } from '@/modules/server/types/GetServersSort'
import { Max, Min } from 'class-validator'
import { ServerCategory } from '@/modules/server/types/ServerCategory'

@ArgsType()
export class GetServersArgs {
  @Field(() => GetServersSort, { defaultValue: GetServersSort.AZ })
  sort: GetServersSort = GetServersSort.AZ

  @Field({ defaultValue: false })
  joinedOnly: boolean

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
