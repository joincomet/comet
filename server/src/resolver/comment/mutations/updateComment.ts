import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Comment, User } from '@/entity'
import {handleText, logger} from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  commentId: string

  @Field()
  @Length(1, 100000)
  text: string
}

export async function updateComment(
  { em, userId }: Context,
  { commentId, text }: UpdateCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>
): Promise<Comment> {
  logger('updateComment')
  const comment = await em.findOneOrFail(Comment, commentId, ['author'])
  if (comment.author !== em.getReference(User, userId))
    throw new Error('Not author')
  comment.text = handleText(text)
  await em.persistAndFlush(comment)
  await notifyCommentChanged({ id: comment.id, type: ChangeType.Updated })
  return comment
}
