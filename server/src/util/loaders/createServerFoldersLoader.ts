import DataLoader from 'dataloader'
import { Folder, ServerFolder } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createServerFoldersLoader = (em: EntityManager) => {
  return new DataLoader<string, Folder[]>(async (serverIds: string[]) => {
    const serverFolders = await em.find(
      ServerFolder,
      { server: serverIds, folder: { isDeleted: false } },
      ['folder'],
      { orderBy: { position: 'ASC' } }
    )
    const map: Record<string, Folder[]> = {}
    serverIds.forEach(
      serverId =>
        (map[serverId] = serverFolders
          .filter(serverFolder => serverFolder.server.id === serverId)
          .map(serverFolder => serverFolder.folder))
    )
    return serverIds.map(serverId => map[serverId])
  })
}
