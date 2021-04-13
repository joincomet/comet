import { gql } from '@urql/core'

export const ALL_REPLIES_READ = gql`
  subscription AllRepliesRead {
    allRepliesRead
  }
`
