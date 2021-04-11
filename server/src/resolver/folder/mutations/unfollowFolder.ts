import { Folder, UserFolder } from '@/entity'
import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { UserFolderPayload } from '@/resolver/folder/subscriptions/UserFolderPayload'

export async function unfollowFolder(
  { em, user }: Context,
  folderId: string,
  notifyUserFolderDeleted: Publisher<UserFolderPayload>
): Promise<Folder> {
  const folder = await em.findOne(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  const userFolder = await em.findOneOrFail(UserFolder, { user, folder })
  folder.followerCount--
  await em.remove(userFolder).persistAndFlush([folder])
  await notifyUserFolderDeleted({ folderId: folder.id, userId: user.id })
  return folder
}
