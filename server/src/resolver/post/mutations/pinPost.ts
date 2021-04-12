import { Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Post } from '@/entity'

export async function pinPost(
  { em }: Context,
  postId: string,
  notifyPostUpdated: Publisher<{ postId: string }>
): Promise<Post> {
  const post = await em.findOne(Post, postId)
  if (post.isPinned) throw new Error('error.post.alreadyPinned')
  post.isPinned = true
  await em.persistAndFlush(post)
  await notifyPostUpdated({ postId })
  return post
}
