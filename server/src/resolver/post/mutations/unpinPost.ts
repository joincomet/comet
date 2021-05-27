import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Post, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class UnpinPostInput {
  @Field(() => ID)
  postId: string
}

export async function unpinPost(
  { em, userId }: Context,
  { postId }: UnpinPostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  logger('unpinPost')
  const post = await em.findOneOrFail(Post, postId, ['post.server'])
  if (!post.isPinned) throw new Error('Post not pinned')
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(
    em,
    post.server.id,
    ServerPermission.ManagePosts
  )
  post.isPinned = false
  post.pinnedAt = null
  await em.persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
