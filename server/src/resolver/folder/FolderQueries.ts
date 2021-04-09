import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Folder, Server, ServerFolder, User, UserFolder } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { FolderVisibility } from '@/resolver/folder/types'
import { FriendStatus } from '@/resolver/user'

@Resolver(() => Folder)
export class FolderQueries {
  @Authorized()
  @Query(() => [Folder])
  async getUserFolders(@Ctx() { user, em }: Context): Promise<Folder[]> {
    const userFolders = await em.find(
      UserFolder,
      { user, folder: { isDeleted: false } },
      ['folder.owner', 'folder.serverFolder.server'],
      {
        position: QueryOrder.DESC
      }
    )
    return userFolders.map(userFolder => userFolder.folder)
  }

  @CheckJoinedServer()
  @Query(() => [Folder])
  async getServerFolders(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<Folder[]> {
    const server = await em.findOneOrFail(Server, serverId)
    const serverFolders = await em.find(
      ServerFolder,
      { server, folder: { isDeleted: false } },
      ['folder.serverFolder.server'],
      {
        position: QueryOrder.DESC
      }
    )
    return serverFolders.map(serverFolder => serverFolder.folder)
  }

  @Authorized()
  @Query(() => Folder)
  async getFolder(
    @Ctx() { user, em }: Context,
    @Arg('folderId', () => ID) folderId: string
  ): Promise<Folder> {
    const folder = await em.findOneOrFail(Folder, folderId, [
      'owner',
      'serverFolder.server'
    ])
    if (folder.isDeleted) throw new Error('error.folder.deleted')
    if (folder.serverFolder) {
      const server = folder.serverFolder.server
      await user.checkJoinedServer(em, server)
    }
    return folder
  }

  @Authorized()
  @Query(() => [Folder])
  async getOtherUserFolders(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<Folder[]> {
    const them = await em.findOneOrFail(User, userId)
    const [myData] = await user.getFriendData(em, userId)
    return (
      await em.find(
        UserFolder,
        myData.status === FriendStatus.Friends
          ? {
              user: them,
              folder: {
                isDeleted: false,
                owner: them,
                $or: [
                  { visibility: FolderVisibility.Friends },
                  { visibility: FolderVisibility.Public }
                ]
              }
            }
          : {
              user: them,
              folder: {
                isDeleted: false,
                owner: them,
                visibility: FolderVisibility.Public
              }
            },
        ['folder.owner', 'folder.serverFolder.server'],
        {
          position: QueryOrder.DESC
        }
      )
    ).map(uf => uf.folder)
  }
}
