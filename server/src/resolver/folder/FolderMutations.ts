import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Folder } from '@/entity'
import {
  CreateFolderInput,
  createFolder
} from '@/resolver/folder/mutations/createFolder'
import {
  UpdateFolderInput,
  updateFolder
} from '@/resolver/folder/mutations/updateFolder'

@Resolver()
export class FolderMutations {
  @Authorized()
  @Mutation(() => Folder)
  async createFolder(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateFolderInput
  ): Promise<Folder> {
    return createFolder(ctx, input)
  }

  @Authorized()
  @Mutation(() => Folder)
  async updateFolder(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateFolderInput
  ): Promise<Folder> {
    return updateFolder(ctx, input)
  }
}
