import { Args, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Comment } from '@/entity'
import { getComments, GetCommentsArgs } from './queries/getComments'

@Resolver(() => Comment)
export class CommentQueries {
  @Authorized()
  @Query(() => [Comment])
  async getComments(
    @Ctx() ctx: Context,
    @Args() args: GetCommentsArgs
  ): Promise<Comment[]> {
    return getComments(ctx, args)
  }
}
