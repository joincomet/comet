import { gql } from '@urql/core'
import { POST_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $linkUrl: String
    $text: String
    $serverId: ID!
    $images: [Upload!]
  ) {
    createPost(
      title: $title
      linkUrl: $linkUrl
      text: $text
      serverId: $serverId
      images: $images
    ) {
      ...POST_FRAGMENT
    }
  }
  ${POST_FRAGMENT}
`

export const useCreatePostMutation = () => useMutation(CREATE_POST)
