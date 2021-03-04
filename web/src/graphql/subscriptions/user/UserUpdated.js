import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription UserUpdated {
    userUpdated {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`
