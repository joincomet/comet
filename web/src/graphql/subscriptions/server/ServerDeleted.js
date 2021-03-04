import { gql } from '@urql/core'

export default gql`
  subscription ServerDeleted {
    serverDeleted
  }
`
