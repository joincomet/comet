import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Folder, ServerPermission, User, UserFolder } from '@/entity'
import {logger} from "@/util";

@InputType()
export class DeleteFolderInput {
  @Field(() => ID)
  folderId: string
}

export async function deleteFolder(
  { em, userId, liveQueryStore }: Context,
  { folderId }: DeleteFolderInput
): Promise<boolean> {
  logger('deleteFolder')
  const user = await em.findOneOrFail(User, userId)
  const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
  if (folder.isDeleted) throw new Error('Folder already deleted')
  if (folder.owner && folder.owner !== user)
    throw new Error('Must be owner to delete folder')
  else if (folder.server)
    await user.checkServerPermission(
      em,
      folder.server.id,
      ServerPermission.ManageFolders
    )
  folder.isDeleted = true
  if (folder.owner === user) {
    const userFolder = await em.findOne(UserFolder, { user, folder })
    em.remove(userFolder)
  }
  await em.persistAndFlush(folder)
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return true
}
