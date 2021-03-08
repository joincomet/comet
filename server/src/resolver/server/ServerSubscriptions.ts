import { Authorized, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Server } from '@/entity'
import { SubscriptionTopic, SubscriptionFilter } from '@/types'
import {
  UserServerPayload,
  UserJoinedServerResponse,
  UserLeftServerResponse
} from '@/resolver/server'

const serverFilter = async ({
  payload: server,
  context: { em, user }
}: SubscriptionFilter<Server>) => user.hasJoinedServer(em, server)

const joinLeaveFilter = async ({
  payload: { server },
  context: { em, user }
}: SubscriptionFilter<UserServerPayload>) => user.hasJoinedServer(em, server)

@Resolver(() => Server)
export class ServerSubscriptions {
  @Authorized()
  @Subscription(() => Server, {
    topics: SubscriptionTopic.ServerUpdated,
    filter: serverFilter
  })
  serverUpdated(@Root() server: Server) {
    return server
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.ServerDeleted,
    filter: serverFilter
  })
  serverDeleted(@Root() server: Server) {
    return server.id
  }

  @Authorized()
  @Subscription(() => UserJoinedServerResponse, {
    topics: SubscriptionTopic.UserJoinedServer,
    filter: joinLeaveFilter
  })
  userJoinedServer(@Root() { user, server }: UserServerPayload) {
    return { user: user, serverId: server.id } as UserJoinedServerResponse
  }

  @Authorized()
  @Subscription(() => UserLeftServerResponse, {
    topics: SubscriptionTopic.UserLeftServer,
    filter: joinLeaveFilter
  })
  userLeftServer(@Root() { user, server }: UserServerPayload) {
    return { userId: user.id, serverId: server.id } as UserLeftServerResponse
  }
}
