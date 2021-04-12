import { ArgsType, Field, registerEnumType } from 'type-graphql'
import { ServerCategory } from '@/resolver/server'
import { Context } from '@/types'
import { Server } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

@ArgsType()
export class GetPublicServersArgs {
  @Field(() => GetPublicServersSort, { defaultValue: 'Top' })
  sort: GetPublicServersSort = GetPublicServersSort.Top

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory
}

export enum GetPublicServersSort {
  New = 'New',
  Top = 'Top',
  Featured = 'Featured'
}

registerEnumType(GetPublicServersSort, {
  name: 'GetPublicServersSort'
})

export async function getPublicServers(
  { em }: Context,
  { sort, category }: GetPublicServersArgs
): Promise<Server[]> {
  let where: any = {}
  let orderBy = {}

  if (sort === GetPublicServersSort.Featured) {
    where = { isFeatured: true }
    orderBy = { featuredPosition: QueryOrder.ASC }
  } else if (sort === GetPublicServersSort.New) {
    orderBy = { createdAt: QueryOrder.DESC }
  } else if (sort === GetPublicServersSort.Top) {
    orderBy = { userCount: QueryOrder.DESC }
  }

  if (category) {
    where.category = category
  }

  return (await em.find(Server, where, ['userJoins.user'], orderBy)) as Server[]
}
