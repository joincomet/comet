import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const ADD_POST_TO_FOLDER = gql`
  mutation AddPostToFolder($folderId: ID!, $postId: ID!) {
    addPostToFolder(folderId: $folderId, postId: $postId)
  }
`

export const useAddPostToFolderMutation = () => useMutation(ADD_POST_TO_FOLDER)
