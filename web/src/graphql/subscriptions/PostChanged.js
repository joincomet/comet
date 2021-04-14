import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'

export const POST_CHANGED = gql`
  subscription PostChanged {
    postChanged {
      added {
        ...POST_FRAGMENT
        folders {
          id
        }
      }
      updated {
        ...POST_FRAGMENT
      }
      deleted {
        ...POST_FRAGMENT
        folders {
          id
        }
      }
    }
  }
  ${POST_FRAGMENT}
`
