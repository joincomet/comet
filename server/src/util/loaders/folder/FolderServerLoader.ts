import { EntityManager } from '@mikro-orm/postgresql'
import { Folder, Server } from '@/entity'
import DataLoader from 'dataloader'

export const folderServerLoader = (em: EntityManager) => {
  return new DataLoader<string, Server | null | undefined>(
    async (folderIds: string[]) => {
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
}
