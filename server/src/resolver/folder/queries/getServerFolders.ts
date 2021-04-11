import { Context } from '@/types'
import { Folder, Server, ServerFolder } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getServerFolders(
  { em }: Context,
  serverId: string
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
