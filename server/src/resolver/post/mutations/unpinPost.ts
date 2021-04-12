import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Post } from '@/entity'

export async function unpinPost(
  { em }: Context,
  postId: string,
  notifyPostUpdated: Publisher<{ postId: string }>
): Promise<Post> {
  const post = await em.findOne(Post, postId)
  if (!post.isPinned) throw new Error('error.post.notPinned')
  post.isPinned = false
  await em.persistAndFlush(post)
  await notifyPostUpdated({ postId })
  return post
}
