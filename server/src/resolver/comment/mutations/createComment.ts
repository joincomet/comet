import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import {
  Comment,
  CommentVote,
  Post,
  Reply,
  ServerPermission,
  ServerUser,
  User
} from '@/entity'
import { handleText } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

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
  notifyReplyChanged: Publisher<ChangePayload>
): Promise<Comment> {
  text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
  if (!text) throw new Error('error.comment.empty')

  const post = await em.findOneOrFail(Post, postId, ['author.user'])
  const user = await em.findOneOrFail(User, userId)
  const serverUser = await em.findOneOrFail(ServerUser, {
    user,
    server: post.server
  })
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
    author: serverUser
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

  await em.persistAndFlush([comment, post])

  let reply: Reply
  if (parentComment) {
    if (parentComment.author.user !== user) {
      reply = em.create(Reply, {
        comment,
        user: parentComment.author.user
      })
    }
  } else {
    await em.populate(post, ['author.user'])
    if (post.author.user !== user) {
      reply = em.create(Reply, {
        comment,
        user: post.author.user
      })
    }
  }
  await notifyCommentChanged({ id: comment.id, type: ChangeType.Added })
  if (reply) {
    await em.persistAndFlush(reply)
    await notifyReplyChanged({ id: reply.id, type: ChangeType.Added })
  }
  return comment
}
