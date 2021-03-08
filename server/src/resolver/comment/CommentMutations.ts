import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Context } from '@/types'
import { Comment, Notification, Post } from '@/entity'
import {
  CreateCommentArgs,
  GetCommentsArgs,
  GetCommentsSort
} from '@/resolver/comment'
import { QueryOrder } from '@mikro-orm/core'
import { handleText } from '@/util/text'
import { UserBanServer } from '@/entity/UserBanServer'
import { CommentVote } from '@/entity/CommentVote'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver(() => Comment)
export class CommentMutations {
  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Comment)
  async createComment(
    @Args() { text, postId, parentCommentId }: CreateCommentArgs,
    @Ctx() { user, em }: Context
  ) {
    text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
    if (!text) throw new Error('Comment cannot be empty')

    const post = await em.findOneOrFail(Post, postId)

    const ban = await em.findOne(UserBanServer, { user, server: post.server })
    if (ban) {
      throw new Error('You are banned from this server')
    }

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
      const parentComment = await em.findOne(Comment, parentCommentId, [
        'author'
      ])
      if (parentComment.author !== user) {
        em.persist(
          em.create(Notification, {
            comment: savedComment,
            user: parentComment.author
          })
        )
      }
    } else {
      await em.populate(post, ['author'])
      if (post.author !== user) {
        em.persist(
          em.create(Notification, {
            comment: savedComment,
            user: post.author
          })
        )
      }
    }

    await em.flush()

    return savedComment
  }

  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author', 'post'])
    if (comment.author !== user)
      throw new Error('Attempt to delete post by someone other than author')

    comment.post.commentCount--
    comment.deleted = true
    comment.pinned = false
    await em.persistAndFlush(comment)
    await em.nativeDelete(Notification, { comment })
    return true
  }

  @Authorized(ServerPermission.CreateComment)
  @Mutation(() => Boolean)
  async updateComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('text') text: string,
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
  @Mutation(() => Boolean)
  async voteComment(
    @Arg('commentId', () => ID) commentId: string,
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
  @Mutation(() => Boolean)
  async unvoteComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOneOrFail(Comment, commentId)
    const vote = await em.findOneOrFail(CommentVote, { user, comment })
    await em.remove(vote)
    comment.voteCount--
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized(ServerPermission.ManageComments)
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, user }: Context
  ) {
    const comment = await em.findOneOrFail(Comment, commentId)

    em.assign(comment, {
      removed: true,
      removedReason: reason,
      pinned: false,
      pinRank: null
    })

    await em.nativeDelete(Notification, { comment })
    comment.post.commentCount--
    await em.persistAndFlush(comment)
    return true
  }
}
