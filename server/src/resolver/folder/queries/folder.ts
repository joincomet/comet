import { Folder } from '@/entity'
import { Context } from '@/types'

export async function folder({ em }: Context, id: string): Promise<Folder> {
  return em.findOneOrFail(Folder, { id, isDeleted: false })
}
