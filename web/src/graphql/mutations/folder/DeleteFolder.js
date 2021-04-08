import { gql } from '@urql/core'

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(folderId: $folderId)
  }
`
