import { Context } from '@/types'
import { PostFolderArgs } from '@/resolver/folder/mutations/PostFolderArgs'
import { Folder, FolderPost, Post } from '@/entity'
import { Field, ID, ObjectType, Publisher } from 'type-graphql'
import { PostFolderPayload } from '@/resolver/folder/subscriptions/PostFolderPayload'

@ObjectType()
export class PostRemovedFromFolderResponse {
  @Field(() => ID)
  folderId: string

  @Field(() => ID)
  postId: string
}

export async function removePostFromFolder(
  { em, user }: Context,
  { folderId, postId }: PostFolderArgs,
  notifyPostRemovedFromFolder: Publisher<PostFolderPayload>
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'owner',
    'serverFolder.server'
  ])
  const post = await em.findOneOrFail(Post, postId)
  if (folder.isDeleted) throw new Error('error.folder.deleted')

  await user.checkCanModifyFolder(em, folder)

  const folderPost = await em.findOne(FolderPost, { folder, post })
  if (!folderPost) throw new Error('error.folder.notInFolder')

  folder.updatedAt = new Date()
  folder.postCount--
  await em.remove(folderPost).persistAndFlush(folder)
  await notifyPostRemovedFromFolder({ folderId, postId })
  return folder
}
