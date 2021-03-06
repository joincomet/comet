import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Folder, Server } from '@/entity'

@Resolver()
export class FolderQueries {
  @Authorized()
  @Query(() => [Folder])
  async getServerFolders(
    @Ctx() { user, em }: Context,
    @Arg('serverId', () => ID) serverId: string
  ) {
    const server = await em.findOne(Server, serverId, ['folders'])
    if (!server) throw new Error('Server not found')
    return server.folders
  }

  @Authorized()
  @Query(() => [Folder])
  async getUserFolders(@Ctx() { user, em }: Context) {
    await em.populate(user, 'folders')
    return user.folders
  }
}
