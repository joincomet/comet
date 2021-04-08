import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const REMOVE_POST_FROM_FOLDER = gql`
  mutation RemovePostFromFolder($folderId: ID!, $postId: ID!) {
    removePostFromFolder(folderId: $folderId, postId: $postId) {
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
