import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const GET_USER_FOLDERS = gql`
  query GetUserFolders {
    getUserFolders {
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
