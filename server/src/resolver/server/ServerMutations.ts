import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Server } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import { UserServerPayload } from '@/resolver/server/subscriptions/UserServerPayload'
import {
  CreateServerArgs,
  createServer
} from '@/resolver/server/mutations/createServer'
import {
  EditServerArgs,
  editServer
} from '@/resolver/server/mutations/editServer'
import {
  JoinServerArgs,
  joinServer,
  banUserFromServer,
  UserServerArgs,
  unbanUserFromServer,
  ReorderServersArgs,
  reorderServers
} from '@/resolver/server/mutations'

@Resolver()
export class ServerMutations {
  @Authorized()
  @Mutation(() => Server)
  async createServer(
    @Ctx() ctx: Context,
    @Args() args: CreateServerArgs,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    notifyUserJoinedServer: Publisher<UserServerPayload>
  ): Promise<Server> {
    return createServer(ctx, args, notifyUserJoinedServer)
  }

  @Authorized()
  @Mutation(() => Server)
  async joinServer(
    @Ctx() ctx: Context,
    @Args() args: JoinServerArgs,
    @PubSub(SubscriptionTopic.UserJoinedServer)
    notifyUserJoinedServer: Publisher<UserServerPayload>
  ): Promise<Server> {
    return joinServer(ctx, args, notifyUserJoinedServer)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveServer(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID)
    serverId: string,
    @PubSub(SubscriptionTopic.UserLeftServer)
    notifyUserLeftServer: Publisher<UserServerPayload>
  ): Promise<boolean> {
    await user.leaveServer(em, serverId, notifyUserLeftServer)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async banUserFromServer(
    @Ctx() ctx: Context,
    @Args() args: UserServerArgs,
    @PubSub(SubscriptionTopic.UserLeftServer)
    notifyUserLeftServer: Publisher<UserServerPayload>
  ): Promise<boolean> {
    return banUserFromServer(ctx, args, notifyUserLeftServer)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Ctx() ctx: Context,
    @Args() args: UserServerArgs
  ): Promise<boolean> {
    return unbanUserFromServer(ctx, args)
  }

  @Authorized()
  @Mutation(() => Server)
  async editServer(
    @Ctx() ctx: Context,
    @Args() args: EditServerArgs,
    @PubSub(SubscriptionTopic.ServerUpdated)
    notifyServerUpdated: Publisher<{ serverId: string }>
  ): Promise<Server> {
    return editServer(ctx, args, notifyServerUpdated)
  }

  @Authorized()
  @Mutation(() => [Server])
  async reorderServers(
    @Ctx() ctx: Context,
    @Args() args: ReorderServersArgs,
    @PubSub(SubscriptionTopic.JoinedServersUpdated)
    notifyServersUpdated: Publisher<{ userId: string }>
  ) {
    return reorderServers(ctx, args, notifyServersUpdated)
  }
}
