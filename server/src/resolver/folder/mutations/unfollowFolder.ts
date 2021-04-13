import { Folder, UserFolder } from '@/entity'
import { Context } from '@/types'
import { Publisher } from 'type-graphql'

export async function unfollowFolder(
  { em, user }: Context,
  folderId: string,
  notifyUserFoldersUpdated: Publisher<{ userId: string }>
): Promise<Folder> {
  const folder = await em.findOne(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  const userFolder = await em.findOneOrFail(UserFolder, { user, folder })
  folder.followerCount--
  await em.remove(userFolder).persistAndFlush([folder])
  await notifyUserFoldersUpdated({ userId: user.id })
  return folder
}
