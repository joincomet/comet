import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Reply } from '@/entity'
import { Context } from '@/types'
import { getReplies } from '@/resolver/reply/queries/getReplies'

@Resolver(() => Reply)
export class ReplyQueries {
  @Authorized()
  @Query(() => [Reply])
  async getReplies(
    @Ctx() ctx: Context,
    @Arg('id', () => ID) id: string
  ): Promise<Reply[]> {
    return getReplies(ctx)
  }
}
