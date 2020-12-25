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
import { User } from '@/user/User.Entity'
import { Notification } from '@/notification/Notification.Entity'
import { filterXSS } from 'xss'
import { whiteList } from '@/XSSWhiteList'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Post } from '@/post/Post.Entity'
import { handleUnderscore } from '@/handleUnderscore'
import { CommentSort } from '@/comment/CommentSort'

@Resolver(() => Comment)
export class CommentResolver {
  @InjectRepository(User)
  readonly userRepo: Repository<User>
  @InjectRepository(Post)
  readonly postRepo: Repository<Post>
  @InjectRepository(Comment)
  readonly commentRepo: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepo: Repository<Notification>

  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
    @Args() { textContent, postId, parentCommentId }: SubmitCommentArgs,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .getOne()

    if (post.planetId) {
      const planet = await post.planet
      const bannedUsers = await planet.bannedUsers
      if (bannedUsers.map(u => u.id).includes(userId))
        throw new Error('You have been banned from ' + planet.name)
    }

    textContent = filterXSS(textContent, { whiteList })

    const savedComment = await this.commentRepo.save({
      textContent,
      parentCommentId,
      postId,
      authorId: userId
    })

    await this.userRepo.increment({ id: userId }, 'rocketCount', 1)
    await this.userRepo.increment({ id: userId }, 'commentCount', 1)
    await this.postRepo.increment({ id: postId }, 'commentCount', 1)

    if (parentCommentId) {
      const parentComment = await this.commentRepo.findOne(parentCommentId)
      if (parentComment.authorId !== userId) {
        await this.notificationRepo.save({
          commentId: savedComment.id,
          fromUserId: userId,
          toUserId: parentComment.authorId,
          postId,
          parentCommentId
        } as Notification)
      }
    } else {
      const post = await this.postRepo.findOne(postId)
      if (post.authorId !== userId) {
        await this.notificationRepo.save({
          commentId: savedComment.id,
          fromUserId: userId,
          toUserId: post.authorId,
          postId
        } as Notification)
      }
    }

    await this.commentRepo
      .createQueryBuilder()
      .relation(Comment, 'rocketers')
      .of(savedComment.id)
      .add(userId)

    return savedComment
  }

  @Query(() => [Comment])
  async comments(
    @Args() { postId, sort, username }: CommentsArgs,
    @Ctx() { userId }: Context
  ) {
    if (!postId && !username)
      throw new Error('Must specify either postId or username')

    postId = parseInt(postId, 36)

    const post = await this.postRepo.findOne({ id: postId })

    if (!post) return []

    const qb = await this.commentRepo.createQueryBuilder('comment')

    if (postId) {
      qb.where('comment.postId = :postId', { postId: post.id })
    }

    if (username) {
      qb.leftJoinAndSelect('comment.author', 'author').where(
        'author.username ILIKE :username',
        {
          username: handleUnderscore(username)
        }
      )
    }

    if (userId) {
      const blocking = (
        await this.userRepo
          .createQueryBuilder()
          .relation(User, 'blocking')
          .of(userId)
          .loadMany()
      ).map(user => user.id)

      qb.andWhere('NOT (comment.authorId = ANY(:blocking))', {
        blocking
      })
    }

    if (sort === CommentSort.TOP) qb.addOrderBy('comment.rocketCount', 'DESC')
    else if (sort === CommentSort.NEW)
      qb.addOrderBy('comment.createdAt', 'DESC')

    const comments = await qb.getMany()

    comments.forEach(comment => {
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

    return comments
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepo.findOne(commentId)
    if (comment.authorId !== userId)
      throw new Error('Attempt to delete post by someone other than author')

    this.postRepo.decrement({ id: comment.postId }, 'commentCount', 1)
    this.userRepo.decrement({ id: userId }, 'commentCount', 1)

    await this.commentRepo.update(commentId, { deleted: true, pinned: false })
    await this.notificationRepo.delete({ commentId })

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editComment(
    @Arg('commentId', () => ID) commentId: number,
    @Arg('newTextContent') newTextContent: string,
    @Ctx() { userId }: Context
  ) {
    const comment = await this.commentRepo.findOne(commentId)
    if (comment.authorId !== userId)
      throw new Error('Attempt to edit post by someone other than author')

    newTextContent = filterXSS(newTextContent, { whiteList })

    await this.commentRepo
      .createQueryBuilder()
      .update()
      .set({ editedAt: new Date(), textContent: newTextContent })
      .where('id = :commentId', { commentId })
      .execute()

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async rocketComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.commentRepo
      .createQueryBuilder()
      .relation(Comment, 'rocketers')
      .of(commentId)
      .add(userId)

    await this.commentRepo.increment({ id: commentId }, 'rocketCount', 1)
    await this.userRepo.increment({ id: userId }, 'rocketCount', 1)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.commentRepo
      .createQueryBuilder()
      .relation(Comment, 'rocketers')
      .of(commentId)
      .remove(userId)

    await this.commentRepo.decrement({ id: commentId }, 'rocketCount', 1)
    await this.userRepo.decrement({ id: userId }, 'rocketCount', 1)

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

  @FieldResolver()
  async isRocketed(
    @Root() comment: Comment,
    @Ctx() { commentRocketedLoader, userId }: Context
  ) {
    if (!userId) return false
    return commentRocketedLoader.load({ userId, commentId: comment.id })
  }
}
