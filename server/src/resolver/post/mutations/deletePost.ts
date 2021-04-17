import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, ServerPermission } from '@/entity'
import { Context } from '@/types'

@InputType()
export class DeletePostInput {
  @Field(() => ID)
  postId: string
}

export async function deletePost(
  { em, user }: Context,
  { postId }: DeletePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, ['author.user', 'server'])
  if (post.author.user !== user)
    await user.checkServerPermission(
      em,
      post.server.id,
      ServerPermission.ManagePosts
    )
  post.isDeleted = true
  post.text = '[deleted]'
  await em.persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Deleted })
  return post
}
