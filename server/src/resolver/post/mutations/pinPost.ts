import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Post, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class PinPostInput {
  @Field(() => ID)
  postId: string
}

export async function pinPost(
  { em, user }: Context,
  { postId }: PinPostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, ['post.server'])
  if (post.isPinned) throw new Error('Post already pinned')
  await user.checkServerPermission(
    em,
    post.server.id,
    ServerPermission.ManagePosts
  )
  post.isPinned = true
  post.pinnedAt = new Date()
  await em.persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
