import { Args, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Message } from '@/entity'
import { Context } from '@/types'
import {
  getMessages,
  GetMessagesArgs,
  GetMessagesResponse
} from '@/resolver/message/queries/getMessages'

@Resolver(() => Message)
export class MessageQueries {
  @Authorized()
  @Query(() => [GetMessagesResponse])
  async getMessages(
    @Ctx() ctx: Context,
    @Args()
    args: GetMessagesArgs
  ): Promise<GetMessagesResponse[]> {
    return getMessages(ctx, args)
  }
}
