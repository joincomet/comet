import { Context } from '@/types'
import { PostFolderArgs } from '@/resolver/folder/mutations/PostFolderArgs'
import { Folder, FolderPost, Post } from '@/entity'
import { PostFolderPayload } from '@/resolver/folder/subscriptions/PostFolderPayload'
import { Field, ID, ObjectType, Publisher } from 'type-graphql'

@ObjectType()
export class PostAddedToFolderResponse {
  @Field(() => ID)
  folderId: string

  @Field(() => Post)
  post: Post
}

export async function addPostToFolder(
  { em, user }: Context,
  { folderId, postId }: PostFolderArgs,
  notifyPostAddedToFolder: Publisher<PostFolderPayload>
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  const post = await em.findOneOrFail(Post, postId)
  if (folder.isDeleted) throw new Error('error.folder.deleted')

  await user.checkCanModifyFolder(em, folder)

  let folderPost = await em.findOne(FolderPost, { folder, post })
  if (folderPost) throw new Error('error.folder.alreadyAdded')

  folderPost = em.create(FolderPost, { folder, post, addedByUser: user })
  folder.updatedAt = new Date()
  folder.postCount++
  await em.persistAndFlush([folder, folderPost])
  await notifyPostAddedToFolder({ folderId, postId })
  return folder
}
