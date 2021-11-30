import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Folder, FolderPost, Post, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class AddPostToFolderInput {
  @Field(() => ID)
  postId: string

  @Field(() => ID)
  folderId: string
}

export async function addPostToFolder(
  { em, userId, liveQueryStore }: Context,
  { postId, folderId }: AddPostToFolderInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Folder> {
  logger('addPostToFolder')
  const post = await em.findOneOrFail(Post, postId)
  const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
  const user = await em.findOneOrFail(User, userId)
  await user.checkCanAddToFolder(em, folderId)
  let folderPost = await em.findOne(FolderPost, { folder, post })
  if (folderPost) throw new Error('error.folder.alreadyAdded')
  folderPost = em.create(FolderPost, { folder, post, addedByUser: user })
  folder.postCount++
  await em.persistAndFlush([folder, folderPost])
  await notifyPostChanged({ id: post.id, type: ChangeType.Added })
  return folder
}
