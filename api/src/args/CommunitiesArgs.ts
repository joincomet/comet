import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { CommunitySort } from '@/types/CommunitySort'

@ArgsType()
export class CommunitiesArgs extends PaginationArgs {
  @Field(() => CommunitySort, { defaultValue: CommunitySort.AZ })
  sort: CommunitySort = CommunitySort.AZ

  @Field({ defaultValue: false })
  joined: boolean

  @Field(() => [String], { nullable: true })
  names?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field({ nullable: true })
  search?: string
}
