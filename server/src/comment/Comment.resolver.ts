import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/Context'
import { Comment } from '@/comment/Comment.Entity'
import { SubmitCommentArgs } from '@/comment/SubmitCommentArgs'
import { CommentsArgs } from '@/comment/CommentsArgs'
import { Notification } from '@/notification/Notification.Entity'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { CommentSort } from '@/comment/CommentSort'
import { Post } from '@/post/Post.entity'
import { QueryOrder, wrap } from '@mikro-orm/core'
import { base36ToBigInt } from '@/base36ToBigInt'
import { User } from '@/user/User.entity'

@Resolver(() => Comment)
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
    @Args() { textContent, postId, parentCommentId }: SubmitCommentArgs,
    @Ctx() { userId, em }: Context
  ) {
    textContent = textContent.replace(/<[^/>][^>]*><\/[^>]+>/, '')
    if (!textContent) throw new Error('Comment cannot be empty')

    const post = await em.findOne(Post, postId, ['planet.bannedUsers'])
    post.commentCount++
    em.persist(post)

    if (
      post.planet &&
      post.planet.bannedUsers
        .getItems()
        .map(u => u.id)
        .includes(userId)
    )
      throw new Error('You have been banned from ' + post.planet.name)

    textContent = filterXSS(textContent, { whiteList })

    const savedComment = em.create(Comment, {
      textContent,
      parentCommentId,
      post: postId,
      author: userId,
      rocketers: [userId]
    })
    em.persist(savedComment)

    if (parentCommentId) {
      const parentComment = await em.findOne(Comment, parentCommentId, [
        'author'
      ])
      if (parentComment.author.id !== userId) {
        em.persist(
          em.create(Notification, {
            commentId: savedComment.id,
            fromUserId: userId,
            toUserId: parentComment.author.id,
            postId,
            parentCommentId
          })
        )
      }
    } else {
      const post = await em.findOne(Post, postId, ['author'])
      if (post.author.id !== userId) {
        em.persist(
          em.create(Notification, {
            commentId: savedComment.id,
            fromUserId: userId,
            toUserId: post.author.id,
            postId
          })
        )
      }
    }

    await em.flush()

    return savedComment
  }

  @Query(() => [Comment])
  async comments(
    @Args() { postId36, sort }: CommentsArgs,
    @Ctx() { userId, em }: Context
  ) {
    const postId = base36ToBigInt(postId36)

    const post = await em.findOne(Post, postId)

    if (!post) throw new Error('Invalid post ID')

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
        comment.textContent = `<p>[deleted]</p>`
        comment.author = null
      }
      if (comment.removed) {
        comment.textContent = `<p>[removed: ${comment.removedReason}]</p>`
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
    @Arg('commentId', () => ID) commentId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author', 'post'])
    if (comment.author.id !== userId)
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
    @Arg('commentId', () => ID) commentId: bigint,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId, ['author'])
    if (comment.author.id !== userId)
      throw new Error('Attempt to edit post by someone other than author')
    newTextContent = filterXSS(newTextContent, { whiteList })
    comment.editedAt = new Date()
    comment.textContent = newTextContent
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketComment(
    @Arg('commentId', () => ID) commentId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId)
    const user = await em.findOne(User, userId)
    comment.rocketers.add(user)
    comment.rocketCount++
    await em.persistAndFlush(comment)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketComment(
    @Arg('commentId', () => ID) commentId: bigint,
    @Ctx() { userId, em }: Context
  ) {
    const comment = await em.findOne(Comment, commentId)
    const user = await em.findOne(User, userId)
    comment.rocketers.remove(user)
    comment.rocketCount--
    await em.persistAndFlush(comment)
    return true
  }
}
