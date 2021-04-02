import { gql } from '@urql/core'

export const ADD_POST_TO_FOLDER = gql`
  mutation AddPostToFolder($folderId: ID!, $postId: ID!) {
    addPostToFolder(folderId: $folderId, postId: $postId)
  }
`
