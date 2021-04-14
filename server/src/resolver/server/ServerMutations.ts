import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Server } from '@/entity'
import { Context } from '@/types'
import {
  CreateServerInput,
  createServer
} from '@/resolver/server/mutations/createServer'
import { JoinServerInput, joinServer } from '@/resolver/server/mutations'
import {
  UpdateServerInput,
  updateServer
} from '@/resolver/server/mutations/updateServer'

@Resolver()
export class ServerMutations {
  @Authorized()
  @Mutation(() => Server)
  async createServer(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateServerInput
  ): Promise<Server> {
    return createServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async joinServer(
    @Ctx() ctx: Context,
    @Arg('input') input: JoinServerInput
  ): Promise<Server> {
    return joinServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async updateServer(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateServerInput
  ): Promise<Server> {
    return updateServer(ctx, input)
  }
}
