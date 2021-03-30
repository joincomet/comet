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
    @Ctx() { em, user }: Context
  ) {
    const post = await em.findOne(Post, postId)
    if (!post) throw new Error('Post not found')

    const comments = await em.find(
      Comment,
      { post },
      ['author', 'votes.user'],
      sort === GetCommentsSort.Top
        ? { voteCount: QueryOrder.DESC, createdAt: QueryOrder.DESC }
        : { createdAt: QueryOrder.DESC }
    )

    comments.forEach(comment => {
      comment.isVoted = comment.votes
        .getItems()
        .map(vote => vote.user)
        .includes(user)

      if (comment.isDeleted) {
        comment.text = `<p>[deleted]</p>`
        comment.author = null
      }
      if (comment.isRemoved) {
        comment.text = `<p>[removed: ${comment.removedReason}]</p>`
        comment.author = null
      }
    })

    return comments
  }
}
