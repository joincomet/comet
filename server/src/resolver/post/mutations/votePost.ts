import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Post, PostVote } from '@/entity'

export async function votePost(
  { em, user }: Context,
  postId: string,
  notifyPostUpdated: Publisher<{ postId: string }>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId)
  let vote = await em.findOne(PostVote, { user, post })
  if (vote) throw new Error('error.post.alreadyVoted')
  vote = em.create(PostVote, { user, post })
  post.voteCount++
  post.isVoted = true
  await em.persistAndFlush([post, vote])
  await notifyPostUpdated({ postId })
  return post
}
