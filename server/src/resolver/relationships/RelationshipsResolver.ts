import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '@/entity'
import { Context } from '@/types'
import {
  CreateFriendRequestInput,
  createFriendRequest,
  DeleteFriendRequestInput,
  deleteFriendRequest,
  AnswerFriendRequestInput,
  answerFriendRequest,
  BlockUserInput,
  blockUser,
  UnblockUserInput,
  unblockUser,
  RemoveFriendInput,
  removeFriend,
  ReadDmInput,
  readDm,
  OpenDmInput,
  openDm,
  CloseDmInput,
  closeDm
} from '@/resolver/relationships'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { PubSub } from 'type-graphql/dist/decorators/PubSub'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'

@Resolver()
export class RelationshipsResolver {
  // --- Mutations ---
  @Authorized()
  @Mutation(() => User)
  async createFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateFriendRequestInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    messageChanged: Publisher<ChangePayload>
  ): Promise<User> {
    return createFriendRequest(ctx, input, messageChanged)
  }

  @Authorized()
  @Mutation(() => User)
  async deleteFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteFriendRequestInput
  ): Promise<User> {
    return deleteFriendRequest(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async answerFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: AnswerFriendRequestInput
  ): Promise<User> {
    return answerFriendRequest(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async blockUser(
    @Ctx() ctx: Context,
    @Arg('input') input: BlockUserInput
  ): Promise<User> {
    return blockUser(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async unblockUser(
    @Ctx() ctx: Context,
    @Arg('input') input: UnblockUserInput
  ): Promise<User> {
    return unblockUser(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async removeFriend(
    @Ctx() ctx: Context,
    @Arg('input') input: RemoveFriendInput
  ): Promise<User> {
    return removeFriend(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async readDm(
    @Ctx() ctx: Context,
    @Arg('input') input: ReadDmInput
  ): Promise<User> {
    return readDm(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async openDm(
    @Ctx() ctx: Context,
    @Arg('input') input: OpenDmInput
  ): Promise<User> {
    return openDm(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async closeDm(
    @Ctx() ctx: Context,
    @Arg('input') input: CloseDmInput
  ): Promise<User> {
    return closeDm(ctx, input)
  }
}
