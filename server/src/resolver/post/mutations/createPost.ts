import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ArrayMaxSize, Length, MaxLength, IsUrl } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import {
  Post,
  PostImage,
  PostVote,
  Server,
  ServerPermission,
  ServerUser,
  ServerUserStatus,
  User,
  VoteType
} from '@/entity'
import { handleText, scrapeMetadata, uploadImageFileSingle } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class CreatePostInput {
  @Field()
  @Length(1, 300, { message: 'Title must be no longer than 300 characters.' })
  title: string

  @Field({ nullable: true })
  @MaxLength(2000, { message: 'URL must be no longer than 2000 characters.' })
  @IsUrl()
  linkUrl?: string

  @Field({ nullable: true })
  @MaxLength(100000, {
    message: 'Text max length is 100000 characters'
  })
  text?: string

  @Field(() => ID)
  serverId: string

  @Field(() => [CreatePostImagesInput], { nullable: true })
  @ArrayMaxSize(20, { message: 'Cannot upload more than 20 images' })
  images?: CreatePostImagesInput[]
}

@InputType()
class CreatePostImagesInput {
  @Field(() => GraphQLUpload)
  file: FileUpload

  @Field({ nullable: true })
  @MaxLength(180)
  caption?: string

  @Field({ nullable: true })
  @MaxLength(2000)
  @IsUrl()
  linkUrl?: string
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

  const server = await em.findOneOrFail(Server, serverId, { isDeleted: false })
  const user = await em.findOneOrFail(User, userId)
  await user.checkBannedFromServer(em, server.id)

  const postImages: PostImage[] = []

  if (images && images.length > 0) {
    for (const image of images) {
      const url = await uploadImageFileSingle(image.file)
      postImages.push({ url, linkUrl: image.linkUrl, caption: image.caption })
    }
  }

  const post = em.create(Post, {
    title,
    linkUrl,
    author: user,
    server,
    linkMetadata: linkUrl ? await scrapeMetadata(linkUrl) : null,
    images: postImages,
    text: text,
    voteCount: 1
  })
  post.voteType = VoteType.Up
  const vote = em.create(PostVote, { post, user, type: VoteType.Up })
  await em.persistAndFlush([post, vote])
  await notifyPostChanged({ id: post.id, type: ChangeType.Added })
  return post
}
