import { Field, ID, InputType } from 'type-graphql'
import { Folder, UserFolder } from '@/entity'
import { Context } from '@/types'
import { ReorderUtils } from '@/util'

@InputType()
export class FollowFolderInput {
  @Field(() => ID)
  folderId: string
}

export async function followFolder(
  { em, user, liveQueryStore }: Context,
  { folderId }: FollowFolderInput
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
  if (folder.owner === user) throw new Error('Cannot follow your own folder')
  if (folder.server) await user.checkJoinedServer(em, folder.server.id)
  let userFolder = await em.findOne(UserFolder, { user, folder })
  if (userFolder) throw new Error('Already following this folder')
  await user.checkCanViewFolder(em, folderId)
  const firstFolder = await em.findOne(UserFolder, { user })
  userFolder = em.create(UserFolder, {
    user,
    folder,
    position: firstFolder
      ? ReorderUtils.positionBefore(firstFolder.position)
      : ReorderUtils.FIRST_POSITION
  })
  folder.followerCount++
  await em.persistAndFlush([folder, userFolder])
  liveQueryStore.invalidate(`User:${user.id}`)
  return folder
}
