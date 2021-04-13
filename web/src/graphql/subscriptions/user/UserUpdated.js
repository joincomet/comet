import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const USER_UPDATED = gql`
  subscription UserUpdated {
    userUpdated {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
