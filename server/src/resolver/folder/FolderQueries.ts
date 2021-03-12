import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { Folder, Server } from '@/entity'
import { Context } from '@/types'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckServerPermission } from '@/util'

@Resolver(() => Folder)
export class FolderQueries {
  @Authorized()
  @Query(() => Folder)
  async getUserFolders(@Ctx() { user, em }: Context) {
    await em.populate(user, ['folders.folder'])
    return user.folders.getItems().map(userFolder => userFolder.folder)
  }

  @UseMiddleware(CheckServerPermission(ServerPermission.ViewFolders))
  @Query(() => Folder)
  async getServerFolders(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOneOrFail(Server, serverId, ['folders.folder'])
    return server.folders.getItems().map(serverFolder => serverFolder.folder)
  }
}
