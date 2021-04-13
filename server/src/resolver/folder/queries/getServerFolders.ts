import { Context } from '@/types'
import { Folder, Server, ServerFolder } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getServerFolders(
  { em, user }: Context,
  serverId: string
): Promise<Folder[]> {
  await user.checkJoinedServer(em, serverId)
  const server = await em.findOneOrFail(Server, serverId)
  const serverFolders = await em.find(
    ServerFolder,
    { server, folder: { isDeleted: false } },
    ['folder'],
    {
      position: QueryOrder.ASC
    }
  )
  return serverFolders.map(serverFolder => serverFolder.folder)
}
