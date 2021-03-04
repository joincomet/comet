import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'

export default gql`
  subscription messageDeleted {
    messageDeleted
  }
`
