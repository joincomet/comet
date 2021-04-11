import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Folder, Server, ServerFolder } from '@/entity'
import { ReorderUtils } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { getServerFolders } from '@/resolver/folder/queries/getServerFolders'

@ArgsType()
export class ReorderServerFoldersArgs {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  folderId: string

  @Field(() => ID, { nullable: true })
  beforeFolderId: string
}

export async function reorderServerFolders(
  { em, user }: Context,
  { serverId, folderId, beforeFolderId }: ReorderServerFoldersArgs,
  notifyServerFoldersReordered: Publisher<{ serverId: string }>
): Promise<Folder[]> {
  const server = await em.findOneOrFail(Server, serverId)
  const serverFolder = await em.findOneOrFail(ServerFolder, {
    server,
    folder: folderId
  })

  const beforeServerFolder = beforeFolderId
    ? await em.findOneOrFail(ServerFolder, { server, folder: beforeFolderId })
    : null

  if (beforeServerFolder) {
    serverFolder.position = ReorderUtils.positionAfter(
      beforeServerFolder.position
    )
  } else {
    const firstServerFolder = await em.findOne(
      ServerFolder,
      { server },
      { orderBy: { position: QueryOrder.DESC } }
    )
    serverFolder.position = firstServerFolder
      ? ReorderUtils.positionBefore(firstServerFolder.position)
      : ReorderUtils.FIRST_POSITION
  }

  await em.persistAndFlush(serverFolder)
  await notifyServerFoldersReordered({ serverId: server.id })
  return getServerFolders({ em, user }, serverId)
}
