import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const READ_DM = gql`
  mutation ReadDm($userId: ID!) {
    readDm(userId: $userId) {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
