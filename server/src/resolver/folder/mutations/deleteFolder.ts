import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Folder, ServerFolder, ServerPermission, UserFolder } from '@/entity'

export async function deleteFolder(
  { em, user }: Context,
  folderId: string,
  notifyUserFoldersUpdated: Publisher<{ userId: string }>,
  notifyServerFoldersUpdated: Publisher<{ serverId: string }>
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
    await notifyServerFoldersUpdated({
      serverId: server.id
    })
  }
  folder.isDeleted = true
  await em.nativeDelete(UserFolder, { user, folder })
  await em.persistAndFlush(folder)
  await notifyUserFoldersUpdated({ userId: user.id })
  return true
}
