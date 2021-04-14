import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { Post } from '@/entity'
import { Context } from '@/types'
import { handleText } from '@/util'

export async function editPost(
  { em }: Context,
  { postId, text }: EditPostArgs,
  notifyPostUpdated: Publisher<{ postId: string }>
): Promise<Post> {
  const post = await em.findOne(Post, postId)

  text = handleText(text)
  if (!text) text = null

  post.text = text
  post.editedAt = new Date()

  await em.persistAndFlush(post)
  await notifyPostUpdated({ postId })
  return post
}
