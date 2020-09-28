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
import { RepositoryInjector } from '@/RepositoryInjector'
import { Comment } from '@/entities/Comment'
import { SubmitCommentArgs } from '@/args/SubmitCommentArgs'
import { PostCommentsArgs } from '@/args/PostCommentsArgs'
import { User } from '@/entities/User'
import { Notification } from '@/entities/Notification'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { CommentUpvote } from '@/entities/CommentUpvote'
import { flat } from '@/Flat'
import { formatDistanceToNowStrict } from 'date-fns'

@Resolver(() => Comment)
export class CommentResolver extends RepositoryInjector {
  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
    @Args() { textContent, postId, parentCommentId }: SubmitCommentArgs,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .leftJoinAndSelect('post.community', 'community')
      .leftJoinAndSelect('community.bannedUsers', 'bannedUser')
      .getOne()
    const bannedUsers = await (await post.community).bannedUsers
    if (bannedUsers.map((u) => u.id).includes(userId))
      throw new Error(
        'You have been banned from ' + (await post.community).name
      )

    textContent = filterXSS(textContent, { whiteList })

    const savedComment = await this.commentRepository.save({
      textContent,
      parentCommentId,
      postId,
      authorId: userId,
      createdAt: new Date(),
      upvoted: true,
      upvoteCount: 1
    })

    this.commentUpvoteRepository.save({
      commentId: savedComment.id,
      userId,
      active: true,
      createdAt: new Date()
    } as CommentUpvote)

    this.userRepository.increment({ id: userId }, 'upvoteCount', 1)

    this.postRepository.increment({ id: postId }, 'commentCount', 1)

    if (parentCommentId) {
      const parentComment = await this.commentRepository.findOne(
        parentCommentId
      )
      if (parentComment.authorId !== userId) {
        this.notificationRepository.save({
          commentId: savedComment.id,
          fromUserId: userId,
          toUserId: parentComment.authorId,
          postId,
          createdAt: new Date(),
          parentCommentId
        } as Notification)
      }
    } else {
      const post = await this.postRepository.findOne(postId)
      if (post.authorId !== userId) {
        this.notificationRepository.save({
          commentId: savedComment.id,
          fromUserId: userId,
          toUserId: post.authorId,
          postId,
          createdAt: new Date()
        } as Notification)
      }
    }

    return savedComment
  }

  @Query(() => [Comment])
  async postComments(
    @Args() { postId, sort }: PostCommentsArgs,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository.findOne({ id: postId })

    if (!post) return []

    const qb = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId: post.id })

    if (userId) {
      qb.loadRelationCountAndMap(
        'comment.personalUpvoteCount',
        'comment.upvotes',
        'upvote',
        (qb) => {
          return qb
            .andWhere('upvote.active = true')
            .andWhere('upvote.userId = :userId', { userId })
        }
      )

      const blockedUsers = (
        await this.userRepository
          .createQueryBuilder()
          .relation(User, 'blockedUsers')
          .of(userId)
          .loadMany()
      ).map((user) => user.id)

      qb.andWhere('NOT (comment.authorId = ANY(:blockedUsers))', {
        blockedUsers
      })
    }

    /*if (sort === Sort.TOP) {
      qb.addOrderBy('comment.upvoteCount', 'DESC')
    }*/

    qb.addOrderBy('comment.createdAt', 'DESC')
    qb.addOrderBy('comment.upvoteCount', 'DESC')

    const postComments = await qb.getMany()

    postComments.forEach((comment) => {
      comment.upvoted = Boolean(comment.personalUpvoteCount)
      if (comment.deleted) {
        comment.textContent = `<p>[deleted]</p>`
        comment.authorId = null
        comment.author = null
      }
      if (comment.removed) {
        comment.textContent = `<p>[removed: ${comment.removedReason}]</p>`
        comment.authorId = null
        comment.author = null
      }
    })

    if (postComments.length === 0) return []

    const toRemove: any[] = []
    const thread = postComments.filter((c) => c.parentCommentId === null)
    let maxLevel = 0
    const fun = (comments: any, level: number, parent: any) => {
      if (level > maxLevel) maxLevel = level
      for (const comment of comments) {
        comment.childComments = postComments.filter(
          (c: any) => c.parentCommentId === comment.id
        )
        comment.level = level
        if (
          (!comment.childComments || comment.childComments.length === 0) &&
          (comment.deleted || comment.removed)
        ) {
          toRemove.push(comment.id)
        }
        fun(comment.childComments, level + 1, comment)
      }
    }
    fun(thread, 0, null)
    // return thread.reduce(flat, [])
    let comments = thread
      .reduce(flat, [])
      .filter((c: any) => !toRemove.includes(c.id))
    for (let i = 0; i < maxLevel; i++) {
      comments = comments.filter(
        (c: any) =>
          (!c.deleted && !c.removed) ||
          (c.childComments && c.childComments.length > 0)
      )
      for (const comment of comments) {
        if (!comment.childComments) continue
        for (const childId of comment.childComments) {
          if (!comments.find((c: any) => c.id === childId)) {
            comment.childComments = comment.childComments.filter(
              (id: any) => id !== childId
            )
          }
        }
      }
    }
    return comments
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepository.findOne(commentId)
    const user = await this.userRepository.findOne(userId)
    if (comment.authorId !== userId && !user.admin)
      throw new Error('Attempt to delete post by someone other than author')

    this.postRepository.decrement({ id: comment.postId }, 'commentCount', 1)

    await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({ deleted: true })
      .where('id = :commentId', { commentId })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editComment(
    @Arg('commentId', () => ID) commentId: number,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepository.findOne(commentId)
    const user = await this.userRepository.findOne(userId)
    if (comment.authorId !== userId && !user.admin)
      throw new Error('Attempt to edit post by someone other than author')

    newTextContent = filterXSS(newTextContent, { whiteList })

    await this.commentRepository
      .createQueryBuilder()
      .update()
      .set({ editedAt: new Date(), textContent: newTextContent })
      .where('id = :commentId', { commentId })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async toggleCommentUpvote(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .whereInIds(commentId)
      .leftJoinAndSelect('comment.author', 'author')
      .getOne()
    if (!comment) throw new Error('Invalid commentId')

    let active: boolean

    const upvote = await this.commentUpvoteRepository.findOne({
      commentId,
      userId
    })
    if (upvote) {
      await this.commentUpvoteRepository.update(
        { commentId, userId },
        { active: !upvote.active }
      )
      active = !upvote.active
    } else {
      await this.commentUpvoteRepository.save({
        commentId,
        userId,
        createdAt: new Date(),
        active: true
      })
      active = true
    }

    this.commentRepository.update(
      { id: commentId },
      {
        upvoteCount: active ? comment.upvoteCount + 1 : comment.upvoteCount - 1
      }
    )

    const author = await comment.author
    this.userRepository.update(
      { id: author.id },
      {
        upvoteCount: active ? author.upvoteCount + 1 : author.upvoteCount - 1
      }
    )

    return active
  }

  @Authorized()
  @Mutation(() => Boolean)
  async saveComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedComments')
      .of(userId)
      .remove(commentId)

    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedComments')
      .of(userId)
      .add(commentId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unsaveComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'savedComments')
      .of(userId)
      .remove(commentId)
    return true
  }

  @FieldResolver()
  async author(@Root() comment: Comment, @Ctx() { userLoader }: Context) {
    if (!comment.authorId) return null
    return userLoader.load(comment.authorId)
  }

  @FieldResolver()
  async post(@Root() comment: Comment, @Ctx() { postLoader }: Context) {
    return postLoader.load(comment.postId)
  }
}
