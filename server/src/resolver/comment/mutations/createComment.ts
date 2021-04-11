import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length, Matches } from 'class-validator'
import { Context } from '@/types'
import { Comment, Reply, Post } from '@/entity'
import { handleText } from '@/util'
import { PostCommentPayload } from '@/resolver/comment/subscriptions/PostCommentPayload'
import { voteComment } from '@/resolver/comment/mutations/voteComment'

@ArgsType()
export class CreateCommentArgs {
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
  { text, postId, parentCommentId }: CreateCommentArgs,
  notifyCommentCreated: Publisher<PostCommentPayload>
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

  await notifyCommentCreated({ postId: post.id, commentId: comment.id })
  await voteComment({ user, em }, comment.id)

  return comment
}
