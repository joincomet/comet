import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Folder, ServerFolder } from '@/entity'
import { getReorderPosition } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { getServerFolders } from '@/resolver/folder/queries/getServerFolders'

@ArgsType()
export class ReorderServerFoldersArgs {
  @Field(() => ID)
  serverId: string

  @Field(() => ID, { nullable: true })
  beforeFolderId?: string

  @Field(() => ID)
  folderId: string
}

export async function reorderServerFolders(
  { em, user }: Context,
  { serverId, beforeFolderId, folderId }: ReorderServerFoldersArgs,
  notifyServerFoldersReordered: Publisher<{ serverId: string }>
): Promise<Folder[]> {
  const folders = await em.find(
    ServerFolder,
    { server: serverId },
    ['folder'],
    {
      position: QueryOrder.ASC
    }
  )
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
  await notifyServerFoldersReordered({ serverId })
  return getServerFolders({ em, user }, serverId)
}
