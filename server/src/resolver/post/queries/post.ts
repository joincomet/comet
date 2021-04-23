import { Post, User } from '@/entity'
import { Context } from '@/types'

export async function post(
  { em, userId }: Context,
  postId: string
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, [
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
