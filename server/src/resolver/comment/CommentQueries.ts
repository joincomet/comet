import { Args, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Context } from '@/types'
import { Comment, Post } from '@/entity'
import { GetCommentsArgs, GetCommentsSort } from '@/resolver/comment'
import { QueryOrder } from '@mikro-orm/core'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckPostServerPermission } from '@/util'

@Resolver(() => Comment)
export class CommentQueries {
  @CheckPostServerPermission(ServerPermission.ViewComments)
  @Query(() => [Comment], { description: 'Get comments on a post' })
  async getComments(
    @Args() { postId, sort }: GetCommentsArgs,
    @Ctx() { em }: Context
  ) {
    const post = await em.findOne(Post, postId)
    if (!post) throw new Error('Post not found')

    const comments = await em.find(
      Comment,
      { post },
      ['author'],
      sort === GetCommentsSort.TOP
        ? { voteCount: QueryOrder.DESC }
        : { createdAt: QueryOrder.DESC }
    )

    comments.forEach(comment => {
      if (comment.isDeleted) {
        comment.text = `<p>[deleted]</p>`
        comment.author = null
      }
      if (comment.isRemoved) {
        comment.text = `<p>[removed: ${comment.removedReason}]</p>`
        comment.author = null
      }

      /*if (userId)
        comment.isRocketed = comment.rocketers.getItems(false).includes(userId)*/
    })

    return comments
  }
}
