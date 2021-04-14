import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const COMMENT_CHANGED = gql`
  subscription CommentChanged {
    commentChanged {
      added {
        ...COMMENT_FRAGMENT
        post {
          id
        }
      }
      updated {
        ...COMMENT_FRAGMENT
      }
      deleted {
        ...COMMENT_FRAGMENT
        post {
          id
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
`
