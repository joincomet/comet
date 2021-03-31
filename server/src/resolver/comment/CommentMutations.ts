import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { Context, ServerPermission } from '@/types'
import { Comment, Notification, Post, CommentVote } from '@/entity'
import { CreateCommentArgs } from '@/resolver/comment'
import {
  CheckCommentAuthor,
  CheckCommentServerPermission,
  CheckPostServerPermission,
  handleText
} from '@/util'

@Resolver(() => Comment)
export class CommentMutations {
  @CheckPostServerPermission(ServerPermission.CreateComment)
  @Mutation(() => Comment, { description: 'Create a comment on a post' })
  async createComment(
    @Args() { text, postId, parentCommentId }: CreateCommentArgs,
    @Ctx() { user, em }: Context
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
          em.create(Notification, {
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
          em.create(Notification, {
            post,
            comment,
            toUser: post.author,
            fromUser: user
          })
        )
      }
    }

    await em.flush()

    await this.createCommentVote({ user, em }, comment.id)
    comment.isVoted = true
    comment.voteCount = 1

    return comment
  }

  @CheckCommentAuthor()
  @Mutation(() => Boolean, { description: 'Delete a comment' })
  async deleteComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author', 'post'])
    if (comment.author !== user) throw new Error('error.comment.notAuthor')

    if (comment.isDeleted) throw new Error('error.comment.alreadyDeleted')

    comment.post.commentCount--
    comment.isDeleted = true
    comment.isPinned = false
    await em.persistAndFlush(comment)
    await em.nativeDelete(Notification, { comment })
    return true
  }

  @CheckCommentAuthor()
  @Mutation(() => Comment, { description: 'Update a comment' })
  async editComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('text', { description: 'New comment text' }) text: string,
    @Ctx() { user, em }: Context
  ): Promise<Comment> {
    const comment = await em.findOne(Comment, commentId, ['author'])
    if (comment.author !== user) throw new Error('error.post.notAuthor')
    text = handleText(text)
    comment.editedAt = new Date()
    comment.text = text
    await em.persistAndFlush(comment)
    return comment
  }

  @CheckCommentServerPermission(ServerPermission.VoteComment)
  @Mutation(() => Comment, { description: 'Add vote to a comment' })
  async createCommentVote(
    @Ctx() { user, em }: Context,
    @Arg('commentId', () => ID, { description: 'ID of comment to vote' })
    commentId: string
  ): Promise<Comment> {
    const comment = await em.findOneOrFail(Comment, commentId)
    let vote = await em.findOne(CommentVote, { user, comment })
    if (vote) throw new Error('error.comment.alreadyVoted')
    vote = em.create(CommentVote, { user, comment })
    comment.voteCount++
    comment.isVoted = true
    await em.persistAndFlush([comment, vote])
    return comment
  }

  @CheckCommentServerPermission(ServerPermission.VoteComment)
  @Mutation(() => Comment, { description: 'Remove vote from a comment' })
  async removeCommentVote(
    @Ctx() { user, em }: Context,
    @Arg('commentId', () => ID, { description: 'ID of comment to remove vote' })
    commentId: string
  ): Promise<Comment> {
    const comment = await em.findOneOrFail(Comment, commentId)
    const vote = await em.findOneOrFail(CommentVote, { user, comment })
    comment.voteCount--
    comment.isVoted = false
    await em.remove(vote).persistAndFlush([comment])
    return comment
  }

  @CheckCommentServerPermission(ServerPermission.ManageComments)
  @Mutation(() => Boolean, {
    description: 'Remove a comment (Requires ServerPermission.ManageComments)'
  })
  async removeComment(
    @Ctx() { em, user }: Context,
    @Arg('commentId', () => ID, { description: 'ID of comment to remove' })
    commentId: string,
    @Arg('reason', {
      description: 'Reason for comment removal',
      nullable: true
    })
    reason?: string
  ): Promise<boolean> {
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
