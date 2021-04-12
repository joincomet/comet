import { Context } from '@/types'
import { Folder, UserFolder } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getUserFolders({ em, user }: Context): Promise<Folder[]> {
  const userFolders = await em.find(
    UserFolder,
    { user, folder: { isDeleted: false } },
    ['folder.owner', 'folder.serverFolder.server'],
    {
      position: QueryOrder.ASC
    }
  )
  return userFolders.map(userFolder => userFolder.folder)
}
