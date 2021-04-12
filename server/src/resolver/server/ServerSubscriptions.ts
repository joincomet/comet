import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Server, User } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import { currentUserFilter } from '@/util/currentUserFilter'
import { getJoinedServers } from '@/resolver/server/queries'
import { joinedServerFilter } from '@/util/joinedServerFilter'
import {
  UserJoinedServerResponse,
  UserLeftServerResponse,
  UserServerPayload
} from '@/resolver/server/subscriptions'

@Resolver(() => Server)
export class ServerSubscriptions {
  @Authorized()
  @Subscription(() => Server, {
    topics: SubscriptionTopic.ServerUpdated,
    filter: joinedServerFilter
  })
  async serverUpdated(
    @Ctx() { em }: Context,
    @Root() { serverId }: { serverId: string }
  ): Promise<Server> {
    return em.findOneOrFail(Server, serverId)
  }

  @Authorized()
  @Subscription(() => [Server], {
    topics: SubscriptionTopic.ServersReordered,
    filter: currentUserFilter
  })
  async serversReordered(@Ctx() ctx: Context): Promise<Server[]> {
    return getJoinedServers(ctx)
  }

  @Authorized()
  @Subscription(() => UserJoinedServerResponse, {
    topics: SubscriptionTopic.UserJoinedServer,
    filter: joinedServerFilter
  })
  async userJoinedServer(
    @Ctx() { em },
    @Root() { userId, serverId }: UserServerPayload
  ): Promise<UserJoinedServerResponse> {
    return {
      user: em.findOneOrFail(User, userId),
      serverId
    }
  }

  @Authorized()
  @Subscription(() => UserLeftServerResponse, {
    topics: SubscriptionTopic.UserLeftServer,
    filter: joinedServerFilter
  })
  userLeftServer(
    @Root() { userId, serverId }: UserServerPayload
  ): UserLeftServerResponse {
    return {
      userId,
      serverId
    }
  }
}
