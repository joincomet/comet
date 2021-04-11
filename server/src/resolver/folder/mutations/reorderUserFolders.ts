import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Folder, UserFolder } from '@/entity'
import { ReorderUtils } from '@/util'
import { QueryOrder } from '@mikro-orm/core'
import { getUserFolders } from '@/resolver/folder/queries/getUserFolders'

@ArgsType()
export class ReorderUserFoldersArgs {
  @Field(() => ID)
  folderId: string

  @Field(() => ID, { nullable: true })
  beforeFolderId: string
}

export async function reorderUserFolders(
  { em, user }: Context,
  { folderId, beforeFolderId }: ReorderUserFoldersArgs,
  notifyUserFoldersReordered: Publisher<{ userId: string }>
): Promise<Folder[]> {
  const userFolder = await em.findOneOrFail(UserFolder, {
    user,
    folder: folderId
  })

  const beforeUserFolder = beforeFolderId
    ? await em.findOneOrFail(UserFolder, { user, folder: beforeFolderId })
    : null

  if (beforeUserFolder) {
    userFolder.position = ReorderUtils.positionAfter(beforeUserFolder.position)
  } else {
    const firstUserFolder = await em.findOne(
      UserFolder,
      { user },
      { orderBy: { position: QueryOrder.DESC } }
    )
    userFolder.position = firstUserFolder
      ? ReorderUtils.positionBefore(firstUserFolder.position)
      : ReorderUtils.FIRST_POSITION
  }

  await em.persistAndFlush(userFolder)
  await notifyUserFoldersReordered({ userId: user.id })
  return getUserFolders({ em, user })
}
