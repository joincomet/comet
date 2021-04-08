import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'

export const GET_OTHER_USER_FOLDERS = gql`
  query GetOtherUserFolders($userId: ID!) {
    getOtherUserFolders(userId: $userId) {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`
