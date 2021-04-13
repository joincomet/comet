import { Context } from '@/types'
import {
  Folder,
  FolderVisibility,
  RelationshipStatus,
  User,
  UserFolder
} from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getOtherUserFolders(
  { em, user }: Context,
  userId: string
): Promise<Folder[]> {
  const them = await em.findOneOrFail(User, userId)
  const [myData] = await user.getFriendData(em, userId)
  return (
    await em.find(
      UserFolder,
      myData.status === RelationshipStatus.Friends
        ? {
            user: them,
            folder: {
              isDeleted: false,
              owner: them,
              $or: [
                { visibility: FolderVisibility.Friends },
                { visibility: FolderVisibility.Public }
              ]
            }
          }
        : {
            user: them,
            folder: {
              isDeleted: false,
              owner: them,
              visibility: FolderVisibility.Public
            }
          },
      ['folder.owner', 'folder.serverFolder.server'],
      {
        position: QueryOrder.ASC
      }
    )
  ).map(uf => uf.folder)
}
