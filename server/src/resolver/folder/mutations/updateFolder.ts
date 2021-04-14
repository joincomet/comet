import { ArgsType, Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Folder, FolderVisibility } from '@/entity'
import { Context } from '@/types'

@InputType()
export class UpdateFolderInput {
  @Field(() => ID)
  folderId: string

  @Field({ nullable: true })
  @Length(1, 100)
  name?: string

  @Field({ nullable: true })
  isCollaborative?: boolean

  @Field({ nullable: true })
  isFollowing?: boolean

  @Field(() => ID, { nullable: true })
  beforeFolderId?: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field(() => FolderVisibility, { nullable: true })
  visibility?: FolderVisibility
}

export async function updateFolder(
  { em, user, liveQueryStore }: Context,
  {
    folderId,
    name,
    isCollaborative,
    isDeleted,
    visibility,
    beforeFolderId,
    isFollowing
  }: UpdateFolderInput
): Promise<Folder> {
  liveQueryStore.invalidate(`Folder:${folderId}`)
}
