import {
  Folder,
  FolderVisibility,
  RelationshipStatus,
  UserFolder
} from '@/entity'
import { Context } from '@/types'
import { Publisher } from 'type-graphql'

export async function followFolder(
  { em, user }: Context,
  folderId: string,
  notifyUserFoldersUpdated: Publisher<{ userId: string }>
): Promise<Folder> {
  const folder = await em.findOne(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  if (folder.owner === user) throw new Error('error.folder.owner')
  if (folder.visibility === FolderVisibility.Private)
    throw new Error('error.folder.private')
  if (folder.visibility === FolderVisibility.Friends) {
    const [myData, theirData] = await user.getFriendData(em, folder.owner.id)
    if (myData.status !== RelationshipStatus.Friends)
      throw new Error('error.folder.notFriends')
  }
  const userFolder = em.create(UserFolder, {
    user,
    folder
  })
  folder.followerCount++
  await em.persistAndFlush([userFolder, folder])
  await notifyUserFoldersUpdated({ userId: user.id })
  return folder
}
