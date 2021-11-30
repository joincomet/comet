import { EntityManager } from '@mikro-orm/postgresql'
import { Folder, Server } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const folderServerLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, Server | null | undefined>(
    async (folderIds: string[]) => {
      logger('folderServerLoader', folderIds)
      loader.clearAll()
      const folders = await em.find(Folder, folderIds, ['server'])
      const map: Record<string, Server | null | undefined> = {}
      folderIds.forEach(
        folderId =>
          (map[folderId] = folders.find(
            folder => folder === em.getReference(Folder, folderId)
          )?.server)
      )
      return folderIds.map(postId => map[postId])
    }
  )
  return loader
}
