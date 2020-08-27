import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql'
import { RequiresAuth } from '../middleware/RequiresAuth'
import { Context } from '../Context'
import { RepositoryInjector } from '../RepositoryInjector'
import { Comment } from '../entities/Comment'
import { SubmitCommentArgs } from '../args/SubmitCommentArgs'
import shortid from 'shortid'
import { PostCommentsArgs } from '../args/PostCommentsArgs'
import { User } from '../entities/User'
import { ReplyNotification } from '../entities/ReplyNotification'
import { filterXSS } from 'xss'
import { whiteList } from '../xssWhiteList'
import { CommentEndorsement } from '../entities/CommentEndorsement'
import { flat } from '../flat'

@Resolver(() => Comment)
export class CommentResolver extends RepositoryInjector {
  @UseMiddleware(RequiresAuth)
  @Mutation(() => Comment)
  async submitComment(
    @Args() { textContent, postId, parentCommentId }: SubmitCommentArgs,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :postId', { postId })
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('planet.bannedUsers', 'bannedUser')
      .getOne()
    const bannedUsers = await (await post.planet).bannedUsers
    if (bannedUsers.map((u) => u.id).includes(userId))
      throw new Error('You have been banned from ' + (await post.planet).name)

    /*if (user.lastCommentedAt && !user.admin) {
      if (differenceInSeconds(new Date(), user.lastCommentedAt) < 15) {
        throw new Error('Please wait 15 seconds between comments')
      }
    }*/

    textContent = filterXSS(textContent, { whiteList })

    this.userRepository.update(userId, { lastCommentedAt: new Date() })

    const commentId = shortid.generate()

    const savedComment = await this.commentRepository.save({
      id: commentId,
      textContent,
      parentCommentId,
      postId,
      authorId: userId,
      createdAt: new Date(),
      isEndorsed: true,
      endorsementCount: 1
    } as Comment)

    this.commentEndorsementRepository.save({
      commentId,
      userId,
      active: true,
      createdAt: new Date()
    } as CommentEndorsement)

    this.userRepository.increment({ id: userId }, 'endorsementCount', 1)

    this.postRepository.increment({ id: postId }, 'commentCount', 1)

    if (parentCommentId) {
      const parentComment = await this.commentRepository.findOne(
        parentCommentId
      )
      if (parentComment.authorId !== userId) {
        this.replyNotifRepository.save({
          commentId,
          fromUserId: userId,
          toUserId: parentComment.authorId,
          postId,
          createdAt: new Date(),
          parentCommentId
        } as ReplyNotification)
      }
    } else {
      const post = await this.postRepository.findOne(postId)
      if (post.authorId !== userId) {
        this.replyNotifRepository.save({
          commentId,
          fromUserId: userId,
          toUserId: post.authorId,
          postId,
          createdAt: new Date()
        } as ReplyNotification)
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
        'comment.personalEndorsementCount',
        'comment.endorsements',
        'endorsement',
        (qb) => {
          return qb
            .andWhere('endorsement.active = true')
            .andWhere('endorsement.userId = :userId', { userId })
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
      qb.addOrderBy('comment.endorsementCount', 'DESC')
    }*/

    qb.addOrderBy('comment.createdAt', 'DESC')
    qb.addOrderBy('comment.endorsementCount', 'DESC')

    const postComments = await qb.getMany()

    postComments.forEach((comment) => {
      comment.isEndorsed = Boolean(comment.personalEndorsementCount)
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('commentId', () => ID) commentId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async editComment(
    @Arg('commentId', () => ID) commentId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async toggleCommentEndorsement(
    @Arg('commentId', () => ID) commentId: string,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .whereInIds(commentId)
      .leftJoinAndSelect('comment.author', 'author')
      .getOne()
    if (!comment) throw new Error('Invalid commentId')

    let active: boolean

    const endorsement = await this.commentEndorsementRepository.findOne({
      commentId,
      userId
    })
    if (endorsement) {
      await this.commentEndorsementRepository.update(
        { commentId, userId },
        { active: !endorsement.active }
      )
      active = !endorsement.active
    } else {
      await this.commentEndorsementRepository.save({
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
        endorsementCount: active
          ? comment.endorsementCount + 1
          : comment.endorsementCount - 1
      }
    )

    const author = await comment.author
    this.userRepository.update(
      { id: author.id },
      {
        endorsementCount: active
          ? author.endorsementCount + 1
          : author.endorsementCount - 1
      }
    )

    return active
  }

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async saveComment(
    @Arg('commentId', () => ID) commentId: string,
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

  @UseMiddleware(RequiresAuth)
  @Mutation(() => Boolean)
  async unsaveComment(
    @Arg('commentId', () => ID) commentId: string,
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
