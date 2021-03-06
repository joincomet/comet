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

@Resolver(() => Comment)
export class CommentMutations {
  @Authorized()
  @Mutation(() => Comment)
  async createComment(
    @Args() { text, postId, parentCommentId }: CreateCommentArgs,
    @Ctx() { user, em }: Context
  ) {
    text = text.replace(/<[^/>][^>]*><\/[^>]+>/, '')
    if (!text) throw new Error('Comment cannot be empty')

    const post = await em.findOne(Post, postId, ['server.bannedUsers'])
    if (!post) throw new Error('Post not found')
    post.commentCount++
    em.persist(post)

    if (post.server.bannedUsers.contains(user))
      throw new Error('You have been banned from ' + post.server.name)

    text = handleText(text)

    const savedComment = em.create(Comment, {
      text: text,
      parentCommentId,
      post,
      author: user,
      rocketers: [user]
    })
    em.persist(savedComment)

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
      const post = await em.findOne(Post, postId, ['author'])
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

  @Authorized()
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

  @Authorized()
  @Mutation(() => Boolean)
  async editComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('newText') newText: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author'])
    if (comment.author !== user)
      throw new Error('Attempt to edit post by someone other than author')
    newText = handleText(newText)
    comment.editedAt = new Date()
    comment.text = newText
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId)
    comment.rocketers.add(user)
    comment.rocketCount++
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketComment(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { user, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId)
    comment.rocketers.remove(user)
    comment.rocketCount--
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async removeComment(
    @Arg('commentId', () => ID) commentId: string,
    @Arg('reason') reason: string,
    @Ctx() { em, user }: Context
  ) {
    const comment = await em.findOne(Comment, commentId)

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
