import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/subscriptions'
import { Comment } from '@/entity'
import { Context } from '@/types'

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  commentId: string

  @Field({ nullable: true })
  text?: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field({ nullable: true })
  isVoted?: boolean

  @Field({ nullable: true })
  isPinned?: boolean
}

export async function updateComment(
  { em, user }: Context,
  { commentId, text, isDeleted, isVoted }: UpdateCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyReplyChanged: Publisher<ChangePayload>
): Promise<Comment> {
  await notifyCommentChanged({
    id: commentId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
}
