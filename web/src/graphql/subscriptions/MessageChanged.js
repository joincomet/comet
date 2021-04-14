import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const MESSAGE_CHANGED = gql`
  subscription MessageChanged {
    messageChanged {
      added {
        ...MESSAGE_FRAGMENT
        channel {
          id
          name
        }
        group {
          id
          displayName
        }
      }
      updated {
        ...MESSAGE_FRAGMENT
      }
      deleted {
        ...MESSAGE_FRAGMENT
        channel {
          id
        }
        group {
          id
        }
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`
