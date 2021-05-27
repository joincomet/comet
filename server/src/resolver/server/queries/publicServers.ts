import { ArgsType, Field, registerEnumType } from 'type-graphql'
import { Context } from '@/types'
import { Server, ServerCategory } from '@/entity'
import {logger} from "@/util";

@ArgsType()
export class PublicServersArgs {
  @Field(() => PublicServersSort, { defaultValue: 'Top' })
  sort: PublicServersSort = PublicServersSort.Top

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field({ defaultValue: false })
  featured: boolean = false
}

export enum PublicServersSort {
  New = 'New',
  Top = 'Top'
}

registerEnumType(PublicServersSort, {
  name: 'PublicServersSort'
})

export async function publicServers(
  { em }: Context,
  { sort, category, featured }: PublicServersArgs
): Promise<Server[]> {
  logger('publicServers')
  let where: any = { isDeleted: false }
  let orderBy = {}

  if (sort === PublicServersSort.New) {
    orderBy = { createdAt: 'DESC' }
  } else if (sort === PublicServersSort.Top) {
    orderBy = { userCount: 'DESC', createdAt: 'DESC' }
  }

  if (featured) {
    where.isFeatured = true
  }

  if (category) {
    where.category = category
  }

  return (await em.find(Server, where, {orderBy})) as Server[]
}
