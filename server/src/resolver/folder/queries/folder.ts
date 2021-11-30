import { Folder } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

export async function folder({ em }: Context, id: string): Promise<Folder> {
  logger('folder')
  em = em.fork()
  return em.findOneOrFail(Folder, { id, isDeleted: false })
}
