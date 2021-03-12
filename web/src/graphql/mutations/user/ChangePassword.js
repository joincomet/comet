import { gql } from '@urql/core'

export default gql`
  mutation ChangePassword($password: String!, $currentPassword: String!) {
    changePassword(password: $password, currentPassword: $currentPassword) {
      accessToken
    }
  }
`
