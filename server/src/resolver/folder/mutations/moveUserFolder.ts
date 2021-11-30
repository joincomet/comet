import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Folder, UserFolder } from '@/entity'
import {getReorderPosition, logger} from '@/util'

@InputType()
export class MoveUserFolderInput {
  @Field(() => ID)
  folderId: string

  @Field(() => ID, { nullable: true })
  beforeFolderId?: string
}

export async function moveUserFolder(
  { em, userId, liveQueryStore }: Context,
  { folderId, beforeFolderId }: MoveUserFolderInput
): Promise<Folder> {
  logger('moveUserFolder')
  const folder = await em.findOneOrFail(Folder, folderId, ['server'])
  const userFolders = await em.find(UserFolder, { user: userId }, ['folder'], {
    position: 'ASC'
  })
  const userFolder = userFolders.find(f => f.folder.id === folderId)

  const firstUserFolder = userFolders[0]
  const beforeUserFolder = beforeFolderId
    ? userFolders.find(f => f.folder.id === beforeFolderId)
    : null
  const afterUserFolder = beforeUserFolder
    ? userFolders[userFolders.indexOf(beforeUserFolder) + 1]
    : null

  userFolder.position = getReorderPosition(
    firstUserFolder?.position,
    beforeUserFolder?.position,
    afterUserFolder?.position
  )
  await em.persistAndFlush(userFolder)
  liveQueryStore.invalidate(`Folder:${folderId}`)
  return folder
}
