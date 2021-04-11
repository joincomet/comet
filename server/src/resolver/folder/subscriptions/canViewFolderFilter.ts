import { SubscriptionFilter } from '@/types'
import { Folder, UserFolder } from '@/entity'

export const canViewFolderFilter = async ({
  payload: { folderId },
  context: { em, user }
}: SubscriptionFilter<{ folderId: string }>) => {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'serverFolder.server',
    'owner'
  ])
  if (folder.owner === user) return true
  if (folder.serverFolder?.server) {
    return user.hasJoinedServer(em, folder.serverFolder.server.id)
  }
  return !!(await em.count(UserFolder, { folder }))
}
