import { Field, ID, InputType, Publisher } from 'type-graphql'
import { IsOptional, Length } from 'class-validator'
import { Context } from '@/types'
import { Post, PostVote, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { handleText } from '@/util'

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

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field({ nullable: true })
  isVoted?: boolean

  @Field({ nullable: true })
  isPinned?: boolean
}

export async function updatePost(
  { em, user }: Context,
  { postId, text, isDeleted, isVoted, isPinned }: UpdatePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  const post = await em.findOneOrFail(Post, postId, ['author', 'server.owner'])

  if (text != null) {
    if (post.author !== user) throw new Error('Must be author to edit')
    post.text = text ? handleText(text) : null
  }

  const canManagePosts = await user.hasServerPermission(
    em,
    post.server.id,
    ServerPermission.ManagePosts
  )

  if (isPinned) {
    if (!canManagePosts)
      throw new Error('Must have ManagePosts permission to pin post')
    post.isPinned = true
  }

  if (isDeleted) {
    if (post.author === user || canManagePosts) {
      post.isDeleted = true
    } else
      throw new Error('Must be author or have ManagePosts permission to delete')
  }

  if (isVoted != null) {
    await user.checkServerPermission(
      em,
      post.server.id,
      ServerPermission.VotePost
    )
    if (isVoted) {
      let vote = await em.findOne(PostVote, { user, post })
      if (vote) throw new Error('Already voted')
      vote = em.create(PostVote, { user, post })
      post.voteCount++
      post.isVoted = true
      em.persist(vote)
    } else {
      const vote = await em.findOneOrFail(PostVote, { user, post })
      post.voteCount--
      post.isVoted = false
      await em.remove(vote)
    }
  }

  await notifyPostChanged({
    id: postId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
  return post
}
