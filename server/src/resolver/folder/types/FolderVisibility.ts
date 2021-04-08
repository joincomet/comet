import { registerEnumType } from 'type-graphql'

export enum FolderVisibility {
  Public = 'Public',
  Friends = 'Friends',
  Private = 'Private',
  Unlisted = 'Unlisted'
}

registerEnumType(FolderVisibility, { name: 'FolderVisibility' })
