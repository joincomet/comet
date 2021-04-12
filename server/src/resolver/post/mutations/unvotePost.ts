import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Post, PostVote } from '@/entity'

export async function unvotePost(
  { em, user }: Context,
  postId: string,
  notifyPostUpdated: Publisher<{ postId: string }>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId)
  const vote = await em.findOneOrFail(PostVote, { user, post })
  post.voteCount--
  post.isVoted = false
  await em.remove(vote).persistAndFlush([post])
  await notifyPostUpdated({ postId })
  return post
}
