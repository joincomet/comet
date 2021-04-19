import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import {
  Comment,
  CommentVote,
  Post,
  Reply,
  ServerPermission,
  User
} from '@/entity'
import { handleText } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@InputType()
export class CreateCommentInput {
  @Field()
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  text: string

  @Field(() => ID)
  postId: string

  @Field(() => ID, { nullable: true })
  parentCommentId?: string
}

export async function createComment(
  { em, userId }: Context,
  { text, postId, parentCommentId }: CreateCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyRepliesChanged: Publisher<BulkChangePayload>
): Promise<Comment> {
  text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
  if (!text) throw new Error('error.comment.empty')

  const post = await em.findOneOrFail(Post, postId, ['author.user'])
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(
    em,
    post.server.id,
    ServerPermission.CreateComment
  )

  const parentComment = parentCommentId
    ? await em.findOneOrFail(Comment, parentCommentId, ['author.user'])
    : null

  text = handleText(text)

  const comment = em.create(Comment, {
    text: text,
    parentComment,
    post,
    author: user
  })

  if (
    await user.hasServerPermission(
      em,
      post.server.id,
      ServerPermission.VoteComment
    )
  ) {
    comment.voteCount = 1
    comment.isVoted = true
    const vote = em.create(CommentVote, { comment, user })
    em.persist(vote)
  }

  post.commentCount++

  em.persist([comment, post])

  let reply: Reply
  if (parentComment) {
    if (parentComment.author.user !== user) {
      reply = em.create(Reply, {
        post,
        comment,
        parentComment,
        toUser: parentComment.author,
        fromUser: user
      })
    }
  } else {
    await em.populate(post, ['author'])
    if (post.author.user !== user) {
      reply = em.create(Reply, {
        post,
        comment,
        toUser: post.author,
        fromUser: user
      })
    }
  }
  await notifyCommentChanged({ id: comment.id, type: ChangeType.Added })
  if (reply) {
    await em.persistAndFlush(reply)
    await notifyRepliesChanged({ ids: [reply.id], type: ChangeType.Added })
  }
  return comment
}
