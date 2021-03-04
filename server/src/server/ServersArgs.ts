import { ArgsType, Field, Int } from 'type-graphql'
import { ServerSort } from '@/server/ServerSort'
import { Max, Min } from 'class-validator'
import { ServerCategory } from '@/types/ServerCategory'

@ArgsType()
export class ServersArgs {
  @Field(() => ServerSort, { defaultValue: ServerSort.AZ })
  sort: ServerSort = ServerSort.AZ

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
