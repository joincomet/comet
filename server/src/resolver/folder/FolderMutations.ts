import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context } from '@/types'
import { Folder } from '@/entity'
import {
  createFolder,
  CreateFolderInput
} from '@/resolver/folder/mutations/createFolder'
import {
  updateFolder,
  UpdateFolderInput
} from '@/resolver/folder/mutations/updateFolder'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'

@Resolver()
export class FolderMutations {
  @Authorized()
  @Mutation(() => Folder)
  async createFolder(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateFolderInput
  ): Promise<Folder> {
    return createFolder(ctx, input)
  }

  @Authorized()
  @Mutation(() => Folder)
  async updateFolder(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateFolderInput,
    @PubSub(SubscriptionTopic.PostChanged)
    notifyPostChanged: Publisher<ChangePayload>
  ): Promise<Folder> {
    return updateFolder(ctx, input, notifyPostChanged)
  }
}
