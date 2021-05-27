import { EntityManager } from '@mikro-orm/postgresql'
import { Folder, User } from '@/entity'
import DataLoader from 'dataloader'
import {logger} from "@/util";

export const folderOwnerLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, User | null | undefined>(
    async (folderIds: string[]) => {
      logger('folderOwnerLoader', folderIds)
      loader.clearAll()
      const folders = await em.find(Folder, folderIds, ['owner'])
      const map: Record<string, User | null | undefined> = {}
      folderIds.forEach(
        folderId =>
          (map[folderId] = folders.find(
            folder => folder === em.getReference(Folder, folderId)
          )?.owner)
      )
      return folderIds.map(postId => map[postId])
    }
  )
  return loader
}
