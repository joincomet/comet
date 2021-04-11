import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { Folder, Post } from '@/entity'
import { currentUserFilter } from '@/util/currentUserFilter'
import { UserFolderPayload } from '@/resolver/folder/subscriptions/UserFolderPayload'
import { ServerFolderResponse } from '@/resolver/folder/subscriptions/ServerFolderResponse'
import { ServerFolderPayload } from '@/resolver/folder/subscriptions/ServerFolderPayload'
import { joinedServerFilter } from '@/util/joinedServerFilter'
import { getUserFolders } from '@/resolver/folder/queries/getUserFolders'
import { getServerFolders } from '@/resolver/folder/queries/getServerFolders'
import { ServerFolderDeletedResponse } from '@/resolver/folder/subscriptions/ServerFolderDeletedResponse'
import { canViewFolderFilter } from '@/resolver/folder/subscriptions/canViewFolderFilter'
import { PostFolderPayload } from '@/resolver/folder/subscriptions/PostFolderPayload'
import { PostAddedToFolderResponse } from '@/resolver/folder/mutations/addPostToFolder'
import { PostRemovedFromFolderResponse } from '@/resolver/folder/mutations/removePostFromFolder'

@Resolver()
export class FolderSubscriptions {
  @Authorized()
  @Subscription(() => Folder, {
    topics: SubscriptionTopic.UserFolderCreated,
    filter: currentUserFilter
  })
  async userFolderCreated(
    @Ctx() { em }: Context,
    @Root() { folderId }: UserFolderPayload
  ): Promise<Folder> {
    return em.findOneOrFail(Folder, folderId)
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.UserFolderDeleted,
    filter: currentUserFilter
  })
  userFolderDeleted(@Root() { folderId }: UserFolderPayload): string {
    return folderId
  }

  @Authorized()
  @Subscription(() => [Folder], {
    topics: SubscriptionTopic.UserFoldersReordered,
    filter: currentUserFilter
  })
  async userFoldersReordered(@Ctx() ctx: Context): Promise<Folder[]> {
    return getUserFolders(ctx)
  }

  @Authorized()
  @Subscription(() => ServerFolderResponse, {
    topics: SubscriptionTopic.ServerFolderCreated,
    filter: joinedServerFilter
  })
  async serverFolderCreated(
    @Ctx() { em }: Context,
    @Root() { folderId, serverId }: ServerFolderPayload
  ): Promise<ServerFolderResponse> {
    return {
      serverId,
      folder: await em.findOneOrFail(Folder, folderId)
    }
  }

  @Authorized()
  @Subscription(() => ServerFolderDeletedResponse, {
    topics: SubscriptionTopic.ServerFolderDeleted,
    filter: joinedServerFilter
  })
  serverFolderDeleted(
    @Root() { folderId, serverId }: ServerFolderPayload
  ): ServerFolderDeletedResponse {
    return {
      serverId,
      folderId
    }
  }

  @Authorized()
  @Subscription(() => [Folder], {
    topics: SubscriptionTopic.ServerFoldersReordered,
    filter: joinedServerFilter
  })
  async serverFoldersReordered(
    @Ctx() ctx: Context,
    @Root() { serverId }: { serverId: string }
  ): Promise<Folder[]> {
    return getServerFolders(ctx, serverId)
  }

  @Authorized()
  @Subscription(() => Folder, {
    topics: SubscriptionTopic.FolderUpdated,
    filter: canViewFolderFilter
  })
  async folderUpdated(
    @Ctx() { em }: Context,
    @Root() { folderId }: { folderId: string }
  ): Promise<Folder> {
    return em.findOneOrFail(Folder, folderId)
  }

  @Authorized()
  @Subscription(() => PostAddedToFolderResponse, {
    topics: SubscriptionTopic.PostAddedToFolder,
    filter: canViewFolderFilter
  })
  async postAddedToFolder(
    @Ctx() { em }: Context,
    @Root() { folderId, postId }: PostFolderPayload
  ): Promise<PostAddedToFolderResponse> {
    return {
      post: await em.findOneOrFail(Post, postId),
      folderId
    }
  }

  @Authorized()
  @Subscription(() => PostRemovedFromFolderResponse, {
    topics: SubscriptionTopic.PostAddedToFolder,
    filter: canViewFolderFilter
  })
  postRemovedFromFolder(
    @Root() { folderId, postId }: PostFolderPayload
  ): PostRemovedFromFolderResponse {
    return {
      postId,
      folderId
    }
  }
}
