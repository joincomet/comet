import { Post } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

export async function post({ em }: Context, id: string): Promise<Post> {
  logger('post')
  const post = await em.findOneOrFail(Post, id, ['server', 'author'])
  return post
}
