import { ArgsType, Field, ID, registerEnumType } from 'type-graphql'
import { Comment, Post } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { Context } from '@/types'

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
  const post = await em.findOneOrFail(Post, postId)

  const comments = await em.find(
    Comment,
    { post },
    ['author.user', 'author.roles'],
    sort === CommentsSort.Top
      ? { voteCount: QueryOrder.DESC, createdAt: QueryOrder.DESC }
      : { createdAt: QueryOrder.DESC }
  )

  comments.forEach(comment => {
    if (comment.isDeleted) {
      comment.text = `<p>[deleted]</p>`
      comment.author = null
    }
  })

  return comments
}
