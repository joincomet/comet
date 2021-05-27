import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, PostVote, User, VoteType } from '@/entity'
import {logger} from "@/util";

@InputType()
export class UpdatePostVoteInput {
  @Field(() => ID)
  postId: string

  @Field(() => VoteType)
  type: VoteType
}

export async function updatePostVote(
  { em, userId }: Partial<Context>,
  { postId, type }: UpdatePostVoteInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  logger('updatePostVote')
  const user = await em.findOneOrFail(User, userId)
  const post = await em.findOneOrFail(Post, postId, ['author', 'server'])
  if (type === VoteType.Down && !post.server.isDownvotesEnabled)
    throw new Error('This server does not allow downvotes')
  let vote = await em.findOne(PostVote, { post, user })
  if (!vote) vote = em.create(PostVote, { post, user })
  if (type === VoteType.Up) {
    post.voteCount++
    if (vote.type === VoteType.Down) post.voteCount++
  } else if (type === VoteType.Down) {
    post.voteCount--
    if (vote.type === VoteType.Up) post.voteCount--
  } else if (type === VoteType.None) {
    if (vote.type === VoteType.Up) post.voteCount--
    else if (vote.type === VoteType.Down) post.voteCount++
  }
  post.voteType = type
  vote.type = type
  await em.persistAndFlush([vote, post])
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
