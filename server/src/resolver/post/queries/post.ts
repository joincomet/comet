import { Post } from '@/entity'
import { Context } from '@/types'

export async function post(
  { em, user }: Context,
  postId: string
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, [
    'server',
    'author',
    'votes'
  ])

  if (post.isDeleted) {
    post.author = null
    post.text = '<p>[deleted]</p>'
  }

  post.isVoted = post.votes
    .getItems()
    .map(vote => vote.user)
    .includes(user)

  return post
}
