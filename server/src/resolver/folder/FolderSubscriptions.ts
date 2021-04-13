import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { Folder, Post } from '@/entity'
import { currentUserFilter } from '@/util/currentUserFilter'
import { joinedServerFilter } from '@/util/joinedServerFilter'
import { getUserFolders } from '@/resolver/folder/queries/getUserFolders'
import { getServerFolders } from '@/resolver/folder/queries/getServerFolders'
import { canViewFolderFilter } from '@/resolver/folder/subscriptions/canViewFolderFilter'
import { PostFolderPayload } from '@/resolver/folder/subscriptions/PostFolderPayload'
import { PostAddedToFolderResponse } from '@/resolver/folder/mutations/addPostToFolder'
import { PostRemovedFromFolderResponse } from '@/resolver/folder/mutations/removePostFromFolder'
import { ServerFoldersUpdatedResponse } from '@/resolver/folder/subscriptions/ServerFoldersUpdatedResponse'

@Resolver()
export class FolderSubscriptions {
  @Authorized()
  @Subscription(() => [Folder], {
    topics: SubscriptionTopic.UserFoldersUpdated,
    filter: currentUserFilter
  })
  async userFoldersUpdated(@Ctx() ctx: Context): Promise<Folder[]> {
    return getUserFolders(ctx)
  }

  @Authorized()
  @Subscription(() => ServerFoldersUpdatedResponse, {
    topics: SubscriptionTopic.ServerFoldersUpdated,
    filter: joinedServerFilter
  })
  async serverFoldersUpdated(
    @Ctx() ctx: Context,
    @Root() { serverId }: { serverId: string }
  ): Promise<ServerFoldersUpdatedResponse> {
    return {
      serverId,
      folders: await getServerFolders(ctx, serverId)
    }
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
