import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { canViewCommentsFilter } from '@/resolver/comment/subscriptions/canViewCommentsFilter'
import { Comment } from '@/entity'
import { PostCommentResponse } from '@/resolver/comment/subscriptions/PostCommentResponse'
import { PostCommentPayload } from '@/resolver/comment/subscriptions/PostCommentPayload'
import { CommentDeletedResponse } from '@/resolver/comment/subscriptions/CommentDeletedResponse'

@Resolver()
export class CommentSubscriptions {
  @Authorized()
  @Subscription(() => PostCommentResponse, {
    topics: SubscriptionTopic.CommentCreated,
    filter: canViewCommentsFilter
  })
  async commentCreated(
    @Ctx() { em }: Context,
    @Root() { commentId, postId }: PostCommentPayload
  ): Promise<PostCommentResponse> {
    return {
      comment: await em.findOneOrFail(Comment, commentId),
      postId
    } as PostCommentResponse
  }

  @Authorized()
  @Subscription(() => Comment, {
    topics: SubscriptionTopic.CommentUpdated,
    filter: canViewCommentsFilter
  })
  async commentUpdated(
    @Ctx() { em }: Context,
    @Root() { commentId }: { commentId: string }
  ): Promise<Comment> {
    return em.findOneOrFail(Comment, commentId)
  }

  @Authorized()
  @Subscription(() => CommentDeletedResponse, {
    topics: SubscriptionTopic.CommentDeleted,
    filter: canViewCommentsFilter
  })
  commentDeleted(
    @Ctx() ctx: Context,
    @Root() { commentId, postId }: PostCommentPayload
  ): CommentDeletedResponse {
    return { commentId, postId }
  }
}
