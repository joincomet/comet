import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export const VIEW_DM = gql`
  mutation ViewDm($userId: ID!) {
    viewDm(userId: $userId) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
