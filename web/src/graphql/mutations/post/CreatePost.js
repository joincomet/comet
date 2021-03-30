import { gql } from '@urql/core'

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
      id
      relativeUrl
    }
  }
`
