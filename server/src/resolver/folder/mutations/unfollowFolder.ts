import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Folder, UserFolder } from '@/entity'
import {logger} from "@/util";

@InputType()
export class UnfollowFolderInput {
  @Field(() => ID)
  folderId: string
}

export async function unfollowFolder(
  { em, userId, liveQueryStore }: Context,
  { folderId }: UnfollowFolderInput
): Promise<Folder> {
  logger('unfollowFolder')
  const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
  const userFolder = await em.findOneOrFail(UserFolder, {
    user: userId,
    folder
  })
  folder.followerCount--
  await em.remove(userFolder).persistAndFlush(folder)
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return folder
}
