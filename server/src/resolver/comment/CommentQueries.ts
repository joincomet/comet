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
export class CommentQueries {
  @Authorized()
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
}
