import { gql } from '@urql/core'

export const DM_CLOSED = gql`
  subscription DmClosed {
    dmClosed
  }
`
