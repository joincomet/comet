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
import { Context, SubscriptionTopic } from '@/types'
import { Folder } from '@/entity'
import { PostFolderArgs } from '@/resolver/folder/mutations/PostFolderArgs'
import { PostFolderPayload } from '@/resolver/folder/subscriptions/PostFolderPayload'
import {
  CreateFolderArgs,
  createFolder
} from '@/resolver/folder/mutations/createFolder'
import {
  EditFolderArgs,
  editFolder
} from '@/resolver/folder/mutations/editFolder'
import { addPostToFolder } from '@/resolver/folder/mutations/addPostToFolder'
import { removePostFromFolder } from '@/resolver/folder/mutations/removePostFromFolder'
import { deleteFolder } from '@/resolver/folder/mutations/deleteFolder'
import { followFolder } from '@/resolver/folder/mutations/followFolder'
import { unfollowFolder } from '@/resolver/folder/mutations/unfollowFolder'
import {
  reorderUserFolders,
  ReorderUserFoldersArgs
} from '@/resolver/folder/mutations/reorderUserFolders'
import {
  reorderServerFolders,
  ReorderServerFoldersArgs
} from '@/resolver/folder/mutations/reorderServerFolders'

@Resolver()
export class FolderMutations {
  @Authorized()
  @Mutation(() => Folder)
  async addPostToFolder(
    @Ctx() ctx: Context,
    @Args() args: PostFolderArgs,
    @PubSub(SubscriptionTopic.PostAddedToFolder)
    notifyPostAddedToFolder: Publisher<PostFolderPayload>
  ): Promise<Folder> {
    return addPostToFolder(ctx, args, notifyPostAddedToFolder)
  }

  @Authorized()
  @Mutation(() => Folder)
  async removePostFromFolder(
    @Ctx() ctx: Context,
    @Args() args: PostFolderArgs,
    @PubSub(SubscriptionTopic.PostRemovedFromFolder)
    notifyPostRemovedFromFolder: Publisher<PostFolderPayload>
  ): Promise<Folder> {
    return removePostFromFolder(ctx, args, notifyPostRemovedFromFolder)
  }

  @Authorized()
  @Mutation(() => Folder)
  async createFolder(
    @Ctx() ctx: Context,
    @Args() args: CreateFolderArgs,
    @PubSub(SubscriptionTopic.UserFoldersUpdated)
    notifyUserFoldersUpdated: Publisher<{ userId: string }>,
    @PubSub(SubscriptionTopic.ServerFoldersUpdated)
    notifyServerFolderUpdated: Publisher<{ serverId: string }>
  ): Promise<Folder> {
    return createFolder(
      ctx,
      args,
      notifyUserFoldersUpdated,
      notifyServerFolderUpdated
    )
  }

  @Authorized()
  @Mutation(() => Folder)
  async editFolder(
    @Ctx() ctx: Context,
    @Args() args: EditFolderArgs,
    @PubSub(SubscriptionTopic.FolderUpdated)
    notifyFolderUpdated: Publisher<{ folderId: string }>
  ): Promise<Folder> {
    return editFolder(ctx, args, notifyFolderUpdated)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteFolder(
    @Ctx() ctx: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.UserFoldersUpdated)
    notifyUserFoldersUpdated: Publisher<{ userId: string }>,
    @PubSub(SubscriptionTopic.ServerFoldersUpdated)
    notifyServerFolderUpdated: Publisher<{ serverId: string }>
  ) {
    return deleteFolder(
      ctx,
      folderId,
      notifyUserFoldersUpdated,
      notifyServerFolderUpdated
    )
  }

  @Authorized()
  @Mutation(() => Folder)
  async followFolder(
    @Ctx() ctx: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.UserFoldersUpdated)
    notifyUserFoldersUpdated: Publisher<{ userId: string }>
  ): Promise<Folder> {
    return followFolder(ctx, folderId, notifyUserFoldersUpdated)
  }

  @Authorized()
  @Mutation(() => Folder)
  async unfollowFolder(
    @Ctx() ctx: Context,
    @Arg('folderId', () => ID) folderId: string,
    @PubSub(SubscriptionTopic.UserFoldersUpdated)
    notifyUserFoldersUpdated: Publisher<{ userId: string }>
  ): Promise<Folder> {
    return unfollowFolder(ctx, folderId, notifyUserFoldersUpdated)
  }

  @Authorized()
  @Mutation(() => [Folder])
  async reorderUserFolders(
    @Ctx() ctx: Context,
    @Args() args: ReorderUserFoldersArgs,
    @PubSub(SubscriptionTopic.UserFoldersUpdated)
    notifyUserFoldersUpdated: Publisher<{ userId: string }>
  ) {
    return reorderUserFolders(ctx, args, notifyUserFoldersUpdated)
  }

  @Authorized()
  @Mutation(() => [Folder])
  async reorderServerFolders(
    @Ctx() ctx: Context,
    @Args() args: ReorderServerFoldersArgs,
    @PubSub(SubscriptionTopic.ServerFoldersUpdated)
    notifyServerFoldersUpdated: Publisher<{ serverId: string }>
  ) {
    return reorderServerFolders(ctx, args, notifyServerFoldersUpdated)
  }
}
