import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Relationship } from '@/entity'
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

@Resolver(() => Relationship)
export class RelationshipsResolver {
  // --- Mutations ---
  @Authorized()
  @Mutation(() => Relationship)
  async createFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateFriendRequestInput
  ): Promise<Relationship> {
    return createFriendRequest(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async deleteFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteFriendRequestInput
  ): Promise<Relationship> {
    return deleteFriendRequest(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async answerFriendRequest(
    @Ctx() ctx: Context,
    @Arg('input') input: AnswerFriendRequestInput
  ): Promise<Relationship> {
    return answerFriendRequest(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async blockUser(
    @Ctx() ctx: Context,
    @Arg('input') input: BlockUserInput
  ): Promise<Relationship> {
    return blockUser(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async unblockUser(
    @Ctx() ctx: Context,
    @Arg('input') input: UnblockUserInput
  ): Promise<Relationship> {
    return unblockUser(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async removeFriend(
    @Ctx() ctx: Context,
    @Arg('input') input: RemoveFriendInput
  ): Promise<Relationship> {
    return removeFriend(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async readDm(
    @Ctx() ctx: Context,
    @Arg('input') input: ReadDmInput
  ): Promise<Relationship> {
    return readDm(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async openDm(
    @Ctx() ctx: Context,
    @Arg('input') input: OpenDmInput
  ): Promise<Relationship> {
    return openDm(ctx, input)
  }

  @Authorized()
  @Mutation(() => Relationship)
  async closeDm(
    @Ctx() ctx: Context,
    @Arg('input') input: CloseDmInput
  ): Promise<Relationship> {
    return closeDm(ctx, input)
  }
}
