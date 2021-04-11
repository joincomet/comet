import { ArgsType, Field, ID, registerEnumType } from 'type-graphql'
import { Comment, Post } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'

@ArgsType()
export class GetCommentsArgs {
  @Field(() => ID, {
    nullable: true,
    description: 'Return all comments for given post ID'
  })
  postId: string

  @Field(() => GetCommentsSort, {
    description: 'Sort comments by new or top',
    defaultValue: 'TOP'
  })
  sort: GetCommentsSort = GetCommentsSort.Top
}

export enum GetCommentsSort {
  New = 'NEW',
  Top = 'TOP'
}

registerEnumType(GetCommentsSort, {
  name: 'GetCommentsSort'
})

export async function getComments(
  { em, user }: Context,
  { postId, sort }: GetCommentsArgs
): Promise<Comment[]> {
  const post = await em.findOneOrFail(Post, postId)

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
  })

  return comments
}
