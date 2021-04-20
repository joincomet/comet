import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ArrayMaxSize, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { Post, Server, ServerPermission, User } from '@/entity'
import { handleText, scrapeMetadata, uploadImageSingle } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { GraphQLURL } from 'graphql-scalars'

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 300, { message: 'Title must be no longer than 300 characters.' })
  title: string

  @Field(() => GraphQLURL, { nullable: true })
  @Length(1, 5000, { message: 'URL must be no longer than 5000 characters.' })
  linkUrl?: string

  @Field({ nullable: true })
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  text?: string

  @Field(() => ID)
  serverId: string

  @Field(() => [GraphQLUpload], { nullable: true })
  @ArrayMaxSize(10, { message: 'Cannot upload more than 10 images' })
  images?: FileUpload[]
}

export async function createPost(
  { em, userId }: Context,
  { title, linkUrl, text, serverId, images }: CreatePostInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Post> {
  if (text) {
    text = handleText(text)
    if (!text) text = null
  }

  const server = await em.findOne(Server, serverId)
  const user = await em.findOneOrFail(User, userId)
  await user.checkServerPermission(em, serverId, ServerPermission.CreatePost)

  const imageUrls = []

  if (images && images.length > 0) {
    for (const image of images) {
      const imageUrl = await uploadImageSingle(image)
      imageUrls.push(imageUrl)
    }
  }

  const post = em.create(Post, {
    title,
    linkUrl,
    author: user,
    server,
    linkMetadata: linkUrl ? await scrapeMetadata(linkUrl) : null,
    imageUrls,
    text: text
  })

  await em.persistAndFlush(post)

  await this.votePost({ user, em }, post.id)
  post.isVoted = true
  post.voteCount = 1
  await notifyPostChanged({ id: post.id, type: ChangeType.Added })
  return post
}
