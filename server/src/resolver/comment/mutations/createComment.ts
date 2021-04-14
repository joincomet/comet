import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Comment, Reply, Post } from '@/entity'
import { handleText } from '@/util'
import { voteComment } from '@/resolver/comment/mutations/voteComment'
import { ChangePayload, ChangeType } from '@/subscriptions'

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
  { em, user }: Context,
  { text, postId, parentCommentId }: CreateCommentInput,
  notifyCommentChanged: Publisher<ChangePayload>,
  notifyReplyChanged: Publisher<ChangePayload>
): Promise<Comment> {
  text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
  if (!text) throw new Error('error.comment.empty')

  const post = await em.findOneOrFail(Post, postId)
  const parentComment = parentCommentId
    ? await em.findOneOrFail(Comment, parentCommentId, ['author'])
    : null

  text = handleText(text)

  const comment = em.create(Comment, {
    text: text,
    parentComment,
    post,
    author: user
  })
  post.commentCount++

  em.persist([comment, post])

  if (parentComment) {
    if (parentComment.author !== user) {
      em.persist(
        em.create(Reply, {
          post,
          comment,
          parentComment,
          toUser: parentComment.author,
          fromUser: user
        })
      )
    }
  } else {
    await em.populate(post, ['author'])
    if (post.author !== user) {
      em.persist(
        em.create(Reply, {
          post,
          comment,
          toUser: post.author,
          fromUser: user
        })
      )
    }
  }

  await em.flush()

  comment.isVoted = true
  comment.voteCount = 1

  await notifyCommentChanged({ id: comment.id, type: ChangeType.Added })
  await voteComment({ user, em }, comment.id)

  return comment
}
