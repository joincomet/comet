import { gql } from '@urql/core'

export const POST_DELETED = gql`
  subscription PostDeleted {
    postDeleted {
      postId
      serverId
    }
  }
`
