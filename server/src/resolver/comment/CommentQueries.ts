import { Args, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckPostServerPermission } from '@/util'
import { getComments, GetCommentsArgs } from './queries/getComments'

@Resolver(() => Comment)
export class CommentQueries {
  @CheckPostServerPermission(ServerPermission.ViewComments)
  @Query(() => [Comment], { description: 'Get comments on a post' })
  async getComments(
    @Ctx() ctx: Context,
    @Args() args: GetCommentsArgs
  ): Promise<Comment[]> {
    return getComments(ctx, args)
  }
}
