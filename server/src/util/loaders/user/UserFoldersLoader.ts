import DataLoader from 'dataloader'
import {
  Folder,
  FolderVisibility,
  Relationship,
  RelationshipStatus,
  User,
  UserFolder
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import {logger} from "@/util";

export const userFoldersLoader = (em: EntityManager, currentUserId: string) => {
  const loader = new DataLoader<string, Folder[]>(async (userIds: string[]) => {
    logger('userFoldersLoader', userIds)
    loader.clearAll()
    const userFolders = await em.find(
      UserFolder,
      { user: userIds },
      ['folder'],
      { position: 'DESC' }
    )
    const relationships = await em.find(Relationship, {
      owner: currentUserId,
      user: userIds
    })
    const map: Record<string, Folder[]> = {}
    userIds.forEach(userId => {
      if (userId === currentUserId) {
        map[userId] = userFolders
          .filter(
            userFolder => userFolder.user === em.getReference(User, userId)
          )
          .map(userFolder => userFolder.folder)
      } else {
        const isFriends = !!relationships.find(
          r =>
            r.user === em.getReference(User, userId) &&
            r.status === RelationshipStatus.Friends
        )
        map[userId] = userFolders
          .filter(
            userFolder =>
              userFolder.user === em.getReference(User, userId) &&
              (userFolder.folder.visibility === FolderVisibility.Public ||
                (isFriends &&
                  userFolder.folder.visibility === FolderVisibility.Friends))
          )
          .map(userFolder => userFolder.folder)
      }
    })
    return userIds.map(serverId => map[serverId])
  })
  return loader
}
