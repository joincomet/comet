import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Folder } from '@/entity'
import { Context } from '@/types'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { getUserFolders } from './queries/getUserFolders'
import { getOtherUserFolders } from './queries/getOtherUserFolders'
import { getServerFolders } from './queries/getServerFolders'
import { getFolder } from './queries/getFolder'

@Resolver(() => Folder)
export class FolderQueries {
  @Authorized()
  @Query(() => [Folder])
  async getUserFolders(@Ctx() ctx: Context): Promise<Folder[]> {
    return getUserFolders(ctx)
  }

  @CheckJoinedServer()
  @Query(() => [Folder])
  async getServerFolders(
    @Ctx() ctx: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<Folder[]> {
    return getServerFolders(ctx, serverId)
  }

  @Authorized()
  @Query(() => Folder)
  async getFolder(
    @Ctx() ctx: Context,
    @Arg('folderId', () => ID) folderId: string
  ): Promise<Folder> {
    return getFolder(ctx, folderId)
  }

  @Authorized()
  @Query(() => [Folder])
  async getOtherUserFolders(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<Folder[]> {
    return getOtherUserFolders(ctx, userId)
  }
}
