import { PostServerPayload } from '@/resolver/post/subscriptions'
import { Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Post } from '@/entity'

export async function deletePost(
  { em }: Context,
  postId: string,
  notifyPostDeleted: Publisher<PostServerPayload>
): Promise<boolean> {
  const post = await em.findOne(Post, postId, ['server'])
  post.isDeleted = true
  post.isPinned = false
  await em.persistAndFlush(post)
  await notifyPostDeleted({ postId, serverId: post.server.id })
  return true
}
