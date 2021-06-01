import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, ServerPermission, User } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

@InputType()
export class DeletePostInput {
  @Field(() => ID)
  postId: string
}

export async function deletePost(
  { em, userId }: Context,
  { postId }: DeletePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  logger('deletePost')
  const user = await em.findOneOrFail(User, userId)
  const post = await em.findOneOrFail(Post, postId, ['author', 'server'])
  if (post.author !== user)
    await user.checkServerPermission(
      em,
      post.server.id,
      ServerPermission.ManagePosts
    )
  post.isDeleted = true
  await em.persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Deleted })
  return post
}
