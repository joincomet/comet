import DataLoader from 'dataloader'
import { Folder, Server, ServerFolder } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const serverFoldersLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, Folder[]>(
    async (serverIds: string[]) => {
      logger('serverFoldersLoader', serverIds)
      loader.clearAll()
      const serverFolders = await em.find(
        ServerFolder,
        { server: serverIds, folder: { isDeleted: false } },
        ['folder'],
        { position: 'DESC' }
      )
      const map: Record<string, Folder[]> = {}
      serverIds.forEach(
        serverId =>
          (map[serverId] = serverFolders
            .filter(
              serverFolder =>
                serverFolder.server === em.getReference(Server, serverId)
            )
            .map(serverFolder => serverFolder.folder))
      )
      return serverIds.map(serverId => map[serverId])
    }
  )
  return loader
}
