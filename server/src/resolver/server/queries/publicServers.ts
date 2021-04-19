import { ArgsType, Field, registerEnumType } from 'type-graphql'
import { Context } from '@/types'
import { Server, ServerCategory } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

@ArgsType()
export class PublicServersArgs {
  @Field(() => PublicServersSort, { defaultValue: 'Top' })
  sort: PublicServersSort = PublicServersSort.Top

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory
}

export enum PublicServersSort {
  New = 'New',
  Top = 'Top',
  Featured = 'Featured'
}

registerEnumType(PublicServersSort, {
  name: 'PublicServersSort'
})

export async function publicServers(
  { em }: Context,
  { sort, category }: PublicServersArgs
): Promise<Server[]> {
  let where: any = {}
  let orderBy = {}

  if (sort === PublicServersSort.Featured) {
    where = { isFeatured: true }
    orderBy = { featuredPosition: 'DESC' }
  } else if (sort === PublicServersSort.New) {
    orderBy = { createdAt: 'DESC' }
  } else if (sort === PublicServersSort.Top) {
    orderBy = { userCount: 'DESC' }
  }

  if (category) {
    where.category = category
  }

  return (await em.find(Server, where, ['userJoins.user'], orderBy)) as Server[]
}
