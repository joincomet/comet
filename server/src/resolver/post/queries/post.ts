import { Post } from '@/entity'
import { Context } from '@/types'

export async function post({ em }: Context, id: string): Promise<Post> {
  const post = await em.findOneOrFail(Post, id, [
    'server',
    'author.user',
    'author.roles'
  ])

  if (post.isDeleted) {
    post.author = null
    post.text = '<p>[deleted]</p>'
  }

  return post
}
