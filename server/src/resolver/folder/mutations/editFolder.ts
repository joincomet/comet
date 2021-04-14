import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Length } from 'class-validator'
import {
  Folder,
  FolderVisibility,
  Relationship,
  RelationshipStatus,
  UserFolder
} from '@/entity'
import { uploadImageSingle } from '@/util'

export async function editFolder(
  { em, user }: Context,
  {
    folderId,
    name,
    description,
    avatarFile,
    isCollaborative,
    visibility
  }: EditFolderArgs,
  notifyFolderUpdated: Publisher<{ folderId: string }>
): Promise<Folder> {
  const folder = await em.findOneOrFail(Folder, folderId, [
    'serverFolder.server',
    'owner'
  ])
  if (folder.name === 'Favorites' || folder.name === 'Read Later')
    throw new Error('error.folder.cannotEdit')
  em.assign(folder, {
    avatarUrl: avatarFile
      ? await uploadImageSingle(avatarFile, {
          width: 256,
          height: 256
        })
      : folder.avatarUrl,
    name: name ?? folder.name,
    description: description ?? folder.description,
    isCollaborative: isCollaborative ?? folder.isCollaborative,
    visibility: visibility ?? folder.visibility
  })
  if (visibility === FolderVisibility.Private) {
    await em.nativeDelete(UserFolder, { folder, user: { $ne: user } })
  } else if (visibility === FolderVisibility.Friends) {
    const friends = (
      await em.find(
        Relationship,
        { owner: user, status: RelationshipStatus.Friends },
        ['user']
      )
    ).map(fd => fd.user)
    await em.nativeDelete(UserFolder, { folder, user: { $nin: friends } })
  }
  await em.persistAndFlush(folder)
  await notifyFolderUpdated({ folderId: folder.id })
  return folder
}
