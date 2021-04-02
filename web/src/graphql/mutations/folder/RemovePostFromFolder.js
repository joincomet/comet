import { gql } from '@urql/core'

export const REMOVE_POST_FROM_FOLDER = gql`
  mutation RemovePostFromFolder($folderId: ID!, $postId: ID!) {
    removePostFromFolder(folderId: $folderId, postId: $postId)
  }
`
