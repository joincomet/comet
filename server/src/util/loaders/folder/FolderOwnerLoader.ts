import { EntityManager } from '@mikro-orm/postgresql'
import { Folder, User } from '@/entity'
import DataLoader from 'dataloader'

export const folderOwnerLoader = (em: EntityManager) => {
  const loader = new DataLoader<string, User | null | undefined>(
    async (folderIds: string[]) => {
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
