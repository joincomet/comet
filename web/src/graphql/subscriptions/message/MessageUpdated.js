import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription messageUpdated {
    messageUpdated {
      ...MESSAGE_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
