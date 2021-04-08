import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const UPDATE_FOLDER = gql`
  mutation UpdateFolder(
    $folderId: ID!
    $avatarFile: Upload
    $name: String
    $description: String
    $isCollaborative: Boolean
    $visibility: FolderVisibility
  ) {
    updateFolder(
      folderId: $folderId
      avatarFile: $avatarFile
      name: $name
      description: $description
      isCollaborative: $isCollaborative
      visibility: $visibility
    ) {
      ...FOLDER_FRAGMENT
      owner {
        ...USER_FRAGMENT
      }
      server {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${FOLDER_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
