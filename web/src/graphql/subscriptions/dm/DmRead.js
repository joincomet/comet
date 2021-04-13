import { gql } from '@urql/core'

export const DM_READ = gql`
  subscription DmRead {
    dmRead
  }
`
