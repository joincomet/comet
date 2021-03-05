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
import { Comment } from '@/entity/Comment'
import { CreateCommentArgs } from '@/modules/comment/types/CreateCommentArgs'
import { GetCommentsArgs } from '@/modules/comment/types/GetCommentsArgs'
import { Notification } from '@/entity/Notification'
import { filterXSS } from 'xss'
import { whiteList } from '@/util/xss/xssWhiteList'
import { GetCommentsSort } from '@/modules/comment/types/GetCommentsSort'
import { Post } from '@/entity/Post'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => Comment)
export class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
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
    @Args() { postId, sort }: GetCommentsArgs,
    @Ctx() { user, em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    if (!post) throw new Error('Post not found')

    const comments = await em.find(
      Comment,
      { post },
      ['author'],
      sort === GetCommentsSort.TOP
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
