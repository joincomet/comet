import { Folder } from '@/entity'
import { Context } from '@/types'

export async function folder({ em }: Context, id: string): Promise<Folder> {
  em = em.fork()
  return em.findOneOrFail(Folder, { id, isDeleted: false })
}
