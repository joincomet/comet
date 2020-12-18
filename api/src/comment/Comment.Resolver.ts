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
  readonly userRepository: Repository<User>
  @InjectRepository(Post)
  readonly postRepository: Repository<Post>
  @InjectRepository(Comment)
  readonly commentRepository: Repository<Comment>
  @InjectRepository(Notification)
  readonly notificationRepository: Repository<Notification>

  @Authorized()
  @Mutation(() => Comment)
  async submitComment(
    @Args() { textContent, postId, parentCommentId }: SubmitCommentArgs,
    @Ctx() { userId }: Context
  ) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id  = :postId', { postId })
      .leftJoinAndSelect('post.planet', 'planet')
      .leftJoinAndSelect('planet.bannedUsers', 'bannedUser')
      .getOne()

    const planet = await post.planet
    const bannedUsers = await planet.bannedUsers
    if (bannedUsers.map(u => u.id).includes(userId))
      throw new Error('You have been banned from ' + planet.name)

    textContent = filterXSS(textContent, { whiteList })

    const savedComment = await this.commentRepository.save({
      textContent,
      parentCommentId,
      postId,
      authorId: userId,
      rocketCount: 1,
      rocketers: Promise.resolve([userId])
    })

    this.userRepository.increment({ id: userId }, 'rocketCount', 1)

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
          postId
        } as Notification)
      }
    }

    return savedComment
  }

  @Query(() => [Comment])
  async comments(
    @Args() { postId, sort, username }: CommentsArgs,
    @Ctx() { userId }: Context
  ) {
    postId = parseInt(postId, 36)

    const post = await this.postRepository.findOne({ id: postId })

    if (!post) return []

    const qb = await this.commentRepository.createQueryBuilder('comment')

    if (postId) {
      qb.where('comment.postId = :postId', { postId: post.id })

      if (!sort) sort = CommentSort.TOP // Default top for posts
    }

    if (username) {
      qb.leftJoinAndSelect('comment.author', 'author').where(
        'author.username ILIKE :username',
        {
          username: handleUnderscore(username)
        }
      )

      if (!sort) sort = CommentSort.NEW // Default new for users
    }

    if (userId) {
      const blocking = (
        await this.userRepository
          .createQueryBuilder()
          .relation(User, 'blocking')
          .of(userId)
          .loadMany()
      ).map(user => user.id)

      qb.andWhere('NOT (comment.authorId = ANY(:blocking))', {
        blocking
      })
    }

    qb.addOrderBy('comment.createdAt', 'DESC')

    if (sort === CommentSort.TOP) qb.addOrderBy('comment.rocketCount', 'DESC')

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
    const comment = await this.commentRepository.findOne(commentId)
    const user = await this.userRepository.findOne(userId)
    if (comment.authorId !== userId)
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
    if (comment.authorId !== userId)
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
  async rocketComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.commentRepository
      .createQueryBuilder()
      .relation(Comment, 'rocketers')
      .of(commentId)
      .add(userId)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unrocketComment(
    @Arg('commentId', () => ID) commentId: number,
    @Ctx() { userId }: Context
  ) {
    await this.commentRepository
      .createQueryBuilder()
      .relation(Comment, 'rocketers')
      .of(commentId)
      .remove(userId)
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
