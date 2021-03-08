import { Args, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Comment, Post } from '@/entity'
import { GetCommentsArgs, GetCommentsSort } from '@/resolver/comment'
import { QueryOrder } from '@mikro-orm/core'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver(() => Comment)
export class CommentQueries {
  @Authorized(ServerPermission.ViewComments)
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
