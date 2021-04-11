import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Reply } from '@/entity'
import { Context } from '@/types'
import { getReplies } from '@/resolver/reply/queries/getReplies'

@Resolver(() => Reply)
export class ReplyQueries {
  @Authorized()
  @Query(() => [Reply], {
    description: 'Get all comment replies or only unread comment replies'
  })
  async getReplies(@Ctx() ctx: Context): Promise<Reply[]> {
    return getReplies(ctx)
  }
}
