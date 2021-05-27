import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import {
  Folder,
  FolderVisibility,
  Server,
  ServerFolder,
  ServerPermission,
  User,
  UserFolder
} from '@/entity'
import { Length } from 'class-validator'
import {logger} from "@/util";

@InputType()
export class CreateFolderInput {
  @Field(() => ID, { nullable: true })
  serverId?: string

  @Field()
  @Length(1, 100)
  name: string

  @Field({ defaultValue: false })
  isCollaborative: boolean = false

  @Field(() => FolderVisibility, {
    defaultValue: FolderVisibility.Public
  })
  visibility: FolderVisibility = FolderVisibility.Public
}

export async function createFolder(
  { em, userId, liveQueryStore }: Context,
  { serverId, name, isCollaborative, visibility }: CreateFolderInput
): Promise<Folder> {
  logger('createFolder')
  if (name.length > 100) throw new Error('error.folder.nameTooLong')
  if (name === 'Favorites' || name === 'Read Later')
    throw new Error('error.folder.cannotCreate')
  let folder
  if (serverId) {
    const user = await em.findOneOrFail(User, userId)
    await user.checkServerPermission(
      em,
      serverId,
      ServerPermission.ManageFolders
    )
    const server = await em.findOneOrFail(Server, serverId)
    folder = em.create(Folder, {
      name,
      visibility,
      server: serverId
    })
    const serverFolder = em.create(ServerFolder, {
      server,
      folder
    })
    await em.persistAndFlush([folder, serverFolder])
    liveQueryStore.invalidate(`Server:${serverId}`)
  } else {
    folder = em.create(Folder, {
      owner: userId,
      name,
      visibility,
      isCollaborative
    })
    const userFolder = em.create(UserFolder, {
      user: userId,
      folder
    })
    await em.persistAndFlush([folder, userFolder])
    liveQueryStore.invalidate(`User:${userId}`)
  }
  return folder
}
