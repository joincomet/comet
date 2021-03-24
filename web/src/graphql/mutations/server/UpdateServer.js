import { gql } from '@urql/core'

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
    )
  }
`
