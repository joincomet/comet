import { gql } from '@urql/core'
import { FOLDER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  query GetUserFolders {
    getUserFolders {
      ...FOLDER_FRAGMENT
    }
  }
  ${FOLDER_FRAGMENT}
`
