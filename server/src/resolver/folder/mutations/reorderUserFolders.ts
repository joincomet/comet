import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Folder, UserFolder } from '@/entity'
import { getReorderPosition } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { getUserFolders } from '@/resolver/folder/queries/getUserFolders'

@ArgsType()
export class ReorderUserFoldersArgs {
  @Field(() => ID, { nullable: true })
  beforeFolderId?: string

  @Field(() => ID)
  folderId: string
}

export async function reorderUserFolders(
  { em, user }: Context,
  { folderId, beforeFolderId }: ReorderUserFoldersArgs,
  notifyUserFoldersUpdated: Publisher<{ userId: string }>
): Promise<Folder[]> {
  const folders = await em.find(UserFolder, { user }, ['folder'], {
    position: QueryOrder.ASC
  })
  const folder = folders.find(f => f.folder.id === folderId)

  const firstFolder = folders[0]
  const beforeFolder = beforeFolderId
    ? folders.find(f => f.folder.id === beforeFolderId)
    : null
  const afterFolder = beforeFolder
    ? folders[folders.indexOf(beforeFolder) + 1]
    : null

  folder.position = getReorderPosition(
    firstFolder?.position,
    beforeFolder?.position,
    afterFolder?.position
  )

  await em.persistAndFlush(folder)
  await notifyUserFoldersUpdated({ userId: user.id })
  return getUserFolders({ em, user })
}
