import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Post, User } from '@/entity'
import {handleText, logger} from '@/util'

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  postId: string

  @Field()
  @Length(1, 100000)
  text: string
}

export async function updatePost(
  { em, userId }: Context,
  { postId, text }: UpdatePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  logger('updatePost')
  const post = await em.findOneOrFail(Post, postId, ['author'])
  if (post.author !== em.getReference(User, userId))
    throw new Error('Must be post author to edit')
  post.text = handleText(text)
  await em.persistAndFlush(post)
  await notifyPostChanged({ id: postId, type: ChangeType.Updated })
  return post
}
