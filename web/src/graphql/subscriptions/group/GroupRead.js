import { gql } from '@urql/core'

export const GROUP_READ = gql`
  subscription GroupRead {
    groupRead
  }
`
