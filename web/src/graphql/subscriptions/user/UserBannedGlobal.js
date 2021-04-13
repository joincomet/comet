import { gql } from '@urql/core'

export const USER_BANNED_GLOBAL = gql`
  subscription UserBannedGlobal {
    userBannedGlobal
  }
`
