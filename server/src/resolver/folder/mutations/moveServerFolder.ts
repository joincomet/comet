import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Folder, ServerFolder, ServerPermission, User } from '@/entity'
import {getReorderPosition, logger} from '@/util'

@InputType()
export class MoveServerFolderInput {
  @Field(() => ID)
  folderId: string

  @Field(() => ID, { nullable: true })
  beforeFolderId?: string
}

export async function moveServerFolder(
  { em, userId, liveQueryStore }: Context,
  { folderId, beforeFolderId }: MoveServerFolderInput
): Promise<Folder> {
  logger('moveServerFolder')
  const user = await em.findOneOrFail(User, userId)
  const folder = await em.findOneOrFail(Folder, folderId, ['server'])
  if (!folder.server) throw new Error('Not a server folder')
  await user.checkServerPermission(
    em,
    folder.server.id,
    ServerPermission.ManageFolders
  )
  const serverFolders = await em.find(
    ServerFolder,
    { server: folder.server.id },
    ['folder'],
    {
      position: 'ASC'
    }
  )
  const serverFolder = serverFolders.find(f => f.folder.id === folderId)
  const firstServerFolder = serverFolders[0]
  const beforeServerFolder = beforeFolderId
    ? serverFolders.find(f => f.folder.id === beforeFolderId)
    : null
  const afterServerFolder = beforeServerFolder
    ? serverFolders[serverFolders.indexOf(beforeServerFolder) + 1]
    : null
  serverFolder.position = getReorderPosition(
    firstServerFolder?.position,
    beforeServerFolder?.position,
    afterServerFolder?.position
  )
  await em.persistAndFlush(serverFolder)
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return folder
}
