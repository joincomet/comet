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
import { Context } from '@/types/Context'
import { Comment } from '@/comment/Comment.Entity'
import { SubmitCommentArgs } from '@/comment/SubmitCommentArgs'
import { CommentsArgs } from '@/comment/CommentsArgs'
import { Notification } from '@/notification/Notification.Entity'
import { filterXSS } from 'xss'
import { whiteList } from '@/util/XSSWhiteList'
import { CommentSort } from '@/comment/CommentSort'
import { Post } from '@/post/Post.entity'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Comment)
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
    @Args() { text, postId, parentCommentId }: SubmitCommentArgs,
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

    text = filterXSS(text, { whiteList })

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

  @Query(() => [Comment])
  async getComments(
    @Args() { postId, sort }: CommentsArgs,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    if (!post) throw new Error('Post not found')

    const comments = await em.find(
      Comment,
      { post },
      ['author'],
      sort === CommentSort.TOP
        ? { rocketCount: QueryOrder.DESC }
        : { createdAt: QueryOrder.DESC }
    )

    comments.forEach(comment => {
      if (comment.deleted) {
        comment.text = `<p>[deleted]</p>`
        comment.author = null
      }
      if (comment.removed) {
        comment.text = `<p>[removed: ${comment.removedReason}]</p>`
        comment.author = null
      }

      /*if (userId)
        comment.isRocketed = comment.rocketers.getItems(false).includes(userId)*/
    })

    return comments
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
    newText = filterXSS(newText, { whiteList })
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
}
