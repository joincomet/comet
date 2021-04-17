import { Folder } from '@/entity'
import { Context } from '@/types'

export async function folder(
  { em }: Context,
  folderId: string
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  if (folder.isDeleted) throw new Error('Deleted folder')
  folder.server = folder.serverFolder?.server
  return folder
}
