import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Resolver
} from 'type-graphql'
import { Context, ServerPermission } from '@/types'
import {
  Comment,
  Notification,
  Post,
  CommentVote,
  ServerUserBan
} from '@/entity'
import { CreateCommentArgs } from '@/resolver/comment'
import { handleText } from '@/util'

@Resolver(() => Comment)
export class CommentMutations {
  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Comment, { description: 'Create a comment on a post' })
  async createComment(
    @Args() { text, postId, parentCommentId }: CreateCommentArgs,
    @Ctx() { user, em }: Context
  ) {
    text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
    if (!text) throw new Error('Comment cannot be empty')

    const post = await em.findOneOrFail(Post, postId)

    text = handleText(text)

    const savedComment = em.create(Comment, {
      text: text,
      parentCommentId,
      post,
      author: user
    })
    post.commentCount++

    em.persist([savedComment, post])

    if (parentCommentId) {
      const parentComment = await em.findOneOrFail(Comment, parentCommentId, [
        'author'
      ])
      if (parentComment.author !== user) {
        em.persist(
          em.create(Notification, {
            comment: savedComment,
            toUser: parentComment.author
          })
        )
      }
    } else {
      await em.populate(post, ['author'])
      if (post.author !== user) {
        em.persist(
          em.create(Notification, {
            comment: savedComment,
            toUser: post.author
          })
        )
      }
    }

    await em.flush()

    return savedComment
  }

  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Boolean, { description: 'Delete a comment' })
  async deleteComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author', 'post'])
    if (comment.author !== user)
      throw new Error('Attempt to delete post by someone other than author')

    if (comment.isDeleted) throw new Error('Comment already deleted')

    comment.post.commentCount--
    comment.isDeleted = true
    comment.isPinned = false
    await em.persistAndFlush(comment)
    await em.nativeDelete(Notification, { comment })
    return true
  }

  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Boolean, { description: 'Update a comment' })
  async updateComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('text', { description: 'New comment text' }) text: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author'])
    if (comment.author !== user)
      throw new Error('Attempt to edit post by someone other than author')
    text = handleText(text)
    comment.editedAt = new Date()
    comment.text = text
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized(ServerPermission.VoteComment)
  @Mutation(() => Boolean, { description: 'Add a vote to a comment' })
  async voteComment(
    @Arg('commentId', () => ID, { description: 'ID of comment to vote' })
    commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOneOrFail(Comment, commentId)
    let vote = await em.findOne(CommentVote, { user, comment })
    if (vote) throw new Error('You have already voted this comment')
    vote = em.create(CommentVote, { user, comment })
    comment.voteCount++
    await em.persistAndFlush([comment, vote])
    return true
  }

  @Authorized(ServerPermission.VoteComment)
  @Mutation(() => Boolean, { description: 'Remove vote from a comment' })
  async unvoteComment(
    @Arg('commentId', () => ID, { description: 'ID of comment to remove vote' })
    commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOneOrFail(Comment, commentId)
    const vote = await em.findOneOrFail(CommentVote, { user, comment })
    vote.isActive = false
    comment.voteCount--
    await em.persistAndFlush([comment, vote])
    return true
  }

  @Authorized(ServerPermission.ManageComments)
  @Mutation(() => Boolean, {
    description: 'Remove a comment (Requires ServerPermission.ManageComments)'
  })
  async removeComment(
    @Arg('commentId', () => ID, { description: 'ID of comment to remove' })
    commentId: string,
    @Arg('reason', { description: 'Reason for comment removal' })
    reason: string,
    @Ctx() { em, user }: Context
  ) {
    const comment = await em.findOneOrFail(Comment, commentId)

    em.assign(comment, {
      isRemoved: true,
      removedReason: reason,
      isPinned: false,
      pinPosition: null
    })

    await em.nativeDelete(Notification, { comment })
    comment.post.commentCount--
    await em.persistAndFlush(comment)
    return true
  }
}
