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

export const createUserFoldersLoader = (
  em: EntityManager,
  currentUser: User
) => {
  return new DataLoader<string, Folder[]>(async (userIds: string[]) => {
    const userFolders = await em.find(
      UserFolder,
      { user: userIds },
      ['folder'],
      { orderBy: { position: 'ASC' } }
    )
    const relationships = await em.find(Relationship, {
      owner: currentUser,
      user: userIds
    })
    const map: Record<string, Folder[]> = {}
    userIds.forEach(userId => {
      if (userId === currentUser.id) {
        map[userId] = userFolders
          .filter(userFolder => userFolder.user.id === userId)
          .map(userFolder => userFolder.folder)
      } else {
        const isFriends = !!relationships.find(
          r => r.user.id === userId && r.status === RelationshipStatus.Friends
        )
        map[userId] = userFolders
          .filter(
            userFolder =>
              userFolder.user.id === userId &&
              (userFolder.folder.visibility === FolderVisibility.Public ||
                (isFriends &&
                  userFolder.folder.visibility === FolderVisibility.Friends))
          )
          .map(userFolder => userFolder.folder)
      }
    })
    return userIds.map(serverId => map[serverId])
  })
}
