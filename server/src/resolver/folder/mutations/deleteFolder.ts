import { Context, ServerPermission } from '@/types'
import { Publisher } from 'type-graphql'
import { Folder, ServerFolder, UserFolder } from '@/entity'
import { ServerFolderPayload } from '@/resolver/folder/subscriptions/ServerFolderPayload'
import { UserFolderPayload } from '@/resolver/folder/subscriptions/UserFolderPayload'

export async function deleteFolder(
  { em, user }: Context,
  folderId: string,
  notifyUserFolderDeleted: Publisher<UserFolderPayload>,
  notifyServerFolderDeleted: Publisher<ServerFolderPayload>
): Promise<boolean> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  if (folder.name === 'Favorites' || folder.name === 'Read Later')
    throw new Error('error.folder.cannotDelete')
  if (folder.serverFolder) {
    const server = folder.serverFolder.server
    await user.checkServerPermission(
      em,
      server.id,
      ServerPermission.ManagePosts
    )
    await em.nativeDelete(ServerFolder, { folder })
    await notifyServerFolderDeleted({
      folderId: folder.id,
      serverId: server.id
    })
  }
  folder.isDeleted = true
  await em.nativeDelete(UserFolder, { user, folder })
  await em.persistAndFlush(folder)
  await notifyUserFolderDeleted({ folderId: folder.id, userId: user.id })
  return true
}
