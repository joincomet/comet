import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Folder } from '@/entity'
import { Context } from '@/types'
import { getFolder } from './queries/getFolder'

@Resolver(() => Folder)
export class FolderQueries {
  @Authorized()
  @Query(() => Folder)
  async getFolder(
    @Ctx() ctx: Context,
    @Arg('folderId', () => ID) folderId: string
  ): Promise<Folder> {
    return getFolder(ctx, folderId)
  }
}
