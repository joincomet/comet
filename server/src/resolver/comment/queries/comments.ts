import { ArgsType, Field, ID, registerEnumType } from 'type-graphql'
import { Comment, Post } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'
import {logger} from "@/util";

@ArgsType()
export class CommentsArgs {
  @Field(() => ID, {
    nullable: true
  })
  postId: string

  @Field(() => CommentsSort, {
    defaultValue: 'Top'
  })
  sort: CommentsSort = CommentsSort.Top
}

export enum CommentsSort {
  New = 'New',
  Top = 'Top'
}

registerEnumType(CommentsSort, {
  name: 'CommentsSort'
})

export async function comments(
  { em }: Context,
  { postId, sort }: CommentsArgs
): Promise<Comment[]> {
  logger('comments')
  const post = await em.findOneOrFail(Post, postId)
  return em.find(
    Comment,
    { post },
    {orderBy: sort === CommentsSort.Top
        ? { voteCount: QueryOrder.DESC, createdAt: QueryOrder.DESC }
        : { createdAt: QueryOrder.DESC }}
  )
}
