import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription messageCreated {
    messageCreated {
      ...MESSAGE_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${USER_FRAGMENT}
`
