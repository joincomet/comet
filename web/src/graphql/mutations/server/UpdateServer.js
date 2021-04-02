import { gql } from '@urql/core'
import { SERVER_FRAGMENT } from '@/graphql/fragments'

export const UPDATE_SERVER = gql`
  mutation UpdateServer(
    $serverId: ID!
    $name: String
    $description: String
    $avatarFile: Upload
    $bannerFile: Upload
  ) {
    updateServer(
      serverId: $serverId
      name: $name
      description: $description
      avatarFile: $avatarFile
      bannerFile: $bannerFile
    ) {
      ...SERVER_FRAGMENT
    }
  }
  ${SERVER_FRAGMENT}
`
