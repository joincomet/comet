import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import {
  Folder,
  FolderVisibility,
  Server,
  ServerFolder,
  UserFolder
} from '@/entity'
import { Length } from 'class-validator'

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
  { em, user, liveQueryStore }: Context,
  { serverId, name, isCollaborative, visibility }: CreateFolderInput
): Promise<Folder> {
  if (name.length > 100) throw new Error('error.folder.nameTooLong')
  if (name === 'Favorites' || name === 'Read Later')
    throw new Error('error.folder.cannotCreate')
  let folder
  if (serverId) {
    const server = await em.findOneOrFail(Server, serverId)
    folder = em.create(Folder, {
      name,
      visibility
    })
    const serverFolder = em.create(ServerFolder, {
      server,
      folder
    })
    await em.persistAndFlush([folder, serverFolder])
    liveQueryStore.invalidate(`Server:${serverId}`)
  } else {
    folder = em.create(Folder, {
      owner: user,
      name,
      visibility,
      isCollaborative
    })
    const userFolder = em.create(UserFolder, {
      user,
      folder
    })
    await em.persistAndFlush([folder, userFolder])
    liveQueryStore.invalidate(`User:${user.id}`)
  }
  return folder
}
