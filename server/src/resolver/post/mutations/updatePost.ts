import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { Context } from '@/types'
import { Post } from '@/entity'
import { ChangePayload, ChangeType } from '@/subscriptions'

@InputType()
export class UpdatePostInput {
  @Field(() => ID)
  postId: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  text?: string

  @Field(() => ID, { nullable: true })
  addToFolderId?: string

  @Field(() => ID, { nullable: true })
  removeFromFolderId?: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field({ nullable: true })
  isVoted?: boolean

  @Field({ nullable: true })
  isPinned?: boolean
}

export async function updatePost(
  { em, user }: Context,
  {
    postId,
    text,
    addToFolderId,
    removeFromFolderId,
    isDeleted,
    isVoted,
    isPinned
  }: UpdatePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  await notifyPostChanged({
    id: postId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
}
