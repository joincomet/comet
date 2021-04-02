import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REMOVE_POST_FROM_FOLDER = gql`
  mutation RemovePostFromFolder($folderId: ID!, $postId: ID!) {
    removePostFromFolder(folderId: $folderId, postId: $postId)
  }
`

export const useRemovePostFromFolderMutation = () =>
  useMutation(REMOVE_POST_FROM_FOLDER)
