import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, PostVote, ServerPermission } from '@/entity'

@InputType()
export class UnvotePostInput {
  @Field(() => ID)
  postId: string
}

export async function unvotePost(
  { em, user }: Context,
  { postId }: UnvotePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, ['server'])
  const vote = await em.findOneOrFail(PostVote, { post, user })
  await user.checkServerPermission(
    em,
    post.server.id,
    ServerPermission.VotePost
  )
  post.voteCount--
  post.isVoted = false
  await em.remove(vote).persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
