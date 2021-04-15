import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Comment, CommentVote, Reply, ServerPermission } from '@/entity'
import { Context } from '@/types'
import { handleText } from '@/util'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

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
  { commentId, text, isDeleted, isVoted, isPinned }: UpdateCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyRepliesChanged: Publisher<BulkChangePayload>
): Promise<Comment> {
  const comment = await em.findOneOrFail(Comment, commentId, [
    'post.server.owner',
    'author'
  ])

  if (text != null) {
    if (comment.author !== user)
      throw new Error('Must be author to edit comment')
    comment.text = text ? handleText(text) : null
  }

  const canManageComments = await user.hasServerPermission(
    em,
    comment.post.server.id,
    ServerPermission.ManageComments
  )

  if (isDeleted) {
    if (!(comment.author === user || canManageComments))
      throw new Error(
        'Must be author or have server permission ManageChannels to delete'
      )
    comment.isDeleted = true
    // Delete replies associated with deleted comment
    const replies = await em.find(Reply, { comment })
    em.remove(replies)
    await notifyRepliesChanged({
      ids: replies.map(reply => reply.id),
      type: ChangeType.Deleted
    })
  }

  if (isPinned) {
    if (!canManageComments)
      throw new Error('Must have ManageComments permissions to pin comment')
    comment.isPinned = true
  }

  // Vote/unvote
  if (isVoted != null) {
    await user.checkServerPermission(
      em,
      comment.post.server.id,
      ServerPermission.VoteComment
    )
    if (isVoted) {
      let vote = await em.findOne(CommentVote, { user, comment })
      if (vote) throw new Error('Already voted')
      vote = em.create(CommentVote, { user, comment })
      comment.voteCount++
      comment.isVoted = true
      em.persist(vote)
    } else {
      const vote = await em.findOneOrFail(CommentVote, { user, comment })
      comment.voteCount--
      comment.isVoted = false
      await em.remove(vote)
    }
  }

  await em.persistAndFlush(comment)
  await notifyCommentChanged({
    id: commentId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
  return comment
}
