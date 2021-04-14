import DataLoader from 'dataloader'
import { Folder, UserFolder } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'

export const createUserFoldersLoader = (em: EntityManager) => {
  return new DataLoader<string, Folder[]>(async (userIds: string[]) => {
    const userFolders = await em.find(
      UserFolder,
      { user: userIds },
      ['folder'],
      { orderBy: { position: 'ASC' } }
    )
    const map: Record<string, Folder[]> = {}
    userIds.forEach(
      userId =>
        (map[userId] = userFolders
          .filter(userFolder => userFolder.user.id === userId)
          .map(userFolder => userFolder.folder))
    )
    return userIds.map(serverId => map[serverId])
  })
}
