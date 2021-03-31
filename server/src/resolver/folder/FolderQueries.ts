import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Folder, Server, ServerFolder, UserFolder } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'

@Resolver(() => Folder)
export class FolderQueries {
  @Authorized()
  @Query(() => [Folder])
  async getUserFolders(@Ctx() { user, em }: Context): Promise<Folder[]> {
    const userFolders = await em.find(UserFolder, { user }, ['folder'], {
      position: QueryOrder.DESC
    })
    return userFolders.map(userFolder => userFolder.folder)
  }

  @CheckJoinedServer()
  @Query(() => [Folder])
  async getServerFolders(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<Folder[]> {
    const server = await em.findOneOrFail(Server, serverId)
    const serverFolders = await em.find(ServerFolder, { server }, ['folder'], {
      position: QueryOrder.DESC
    })
    return serverFolders.map(serverFolder => serverFolder.folder)
  }
}
