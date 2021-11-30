import { Server } from '@/entity'
import { Context } from '@/types'
import { ArgsType, Field, ID } from 'type-graphql'
import {handleUnderscore, logger} from '@/util'

@ArgsType()
export class ServerArgs {
  @Field(() => ID, { nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string
}

export async function server(
  { em, userId }: Context,
  { id, name }: ServerArgs
): Promise<Server> {
  logger('server')
  em = em.fork()
  if (!id && !name) throw new Error('Must provide id or name')
  if (id && name) throw new Error('Must provide one of id or name')
  if (name) {
    return em.findOne(
      Server,
      { name: { $ilike: handleUnderscore(name) }, isDeleted: false },
      ['owner']
    )
  } else if (id) {
    return em.findOne(Server, { id, isDeleted: false }, ['owner'])
  }
}
