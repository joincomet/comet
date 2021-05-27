import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Folder, FolderPost, Post, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class RemovePostFromFolderInput {
  @Field(() => ID)
  postId: string

  @Field(() => ID)
  folderId: string
}

export async function removePostFromFolder(
  { em, userId, liveQueryStore }: Context,
  { postId, folderId }: RemovePostFromFolderInput,
  notifyPostChanged: Publisher<ChangePayload>
): Promise<Folder> {
  logger('removePostFromFolder')
  const user = await em.findOneOrFail(User, userId)
  const post = await em.findOneOrFail(Post, postId)
  const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
  await user.checkCanAddToFolder(em, folderId)
  const folderPost = await em.findOneOrFail(FolderPost, { folder, post })
  folder.postCount--
  await em.remove(folderPost).persistAndFlush(folder)
  await notifyPostChanged({ id: post.id, type: ChangeType.Added })
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return folder
}
