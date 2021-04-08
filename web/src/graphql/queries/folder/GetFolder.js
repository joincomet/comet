import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const GET_FOLDER = gql`
  query GetFolder($folderId: ID!) {
    getFolder(folderId: $folderId) {
      ...FOLDER_FRAGMENT
      postCount
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
