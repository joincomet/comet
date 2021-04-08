import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const UNFOLLOW_FOLDER = gql`
  mutation UnfollowFolder($folderId: ID!) {
    unfollowFolder(folderId: $folderId) {
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
