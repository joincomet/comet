import { gql } from '@urql/core'

export default gql`
  mutation UpdateServer(
    $name: String
    $description: String
    $avatarFile: Upload
    $bannerFile: Upload
  ) {
    updateServer(
      name: $name
      description: $description
      avatarFile: $avatarFile
      bannerFile: $bannerFile
    )
  }
`
