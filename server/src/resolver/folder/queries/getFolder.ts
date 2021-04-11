import { Folder } from '@/entity'
import { Context } from '@/types'

export async function getFolder(
  { em, user }: Context,
  folderId: string
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  if (folder.isDeleted) throw new Error('error.folder.deleted')
  if (folder.serverFolder) {
    const server = folder.serverFolder.server
    await user.checkJoinedServer(em, server.id)
  }
  return folder
}
