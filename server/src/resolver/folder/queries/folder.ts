import { Folder } from '@/entity'
import { Context } from '@/types'

export async function folder(
  { em }: Context,
  folderId: string
): Promise<Folder> {
  return em.findOneOrFail(Folder, { id: folderId, isDeleted: false })
}
