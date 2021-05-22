import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, PostVote, ServerPermission, User } from '@/entity'

@InputType()
export class VotePostInput {
  @Field(() => ID)
  postId: string
}

export async function votePost(
  { em, userId }: Partial<Context>,
  { postId }: VotePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  const user = await em.findOneOrFail(User, userId)
  const post = await em.findOneOrFail(Post, postId, ['author', 'server'])
  let vote = await em.findOne(PostVote, { post, user })
  if (vote) throw new Error('Already voted this post')
  vote = em.create(PostVote, { post, user })
  post.voteCount++
  post.isVoted = true
  await em.persistAndFlush([vote, post])
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
