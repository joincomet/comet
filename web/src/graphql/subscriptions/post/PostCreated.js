import { gql } from '@urql/core'
import {
  POST_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const POST_CREATED = gql`
  subscription PostCreated {
    postCreated {
      ...POST_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
      server {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
