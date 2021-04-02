import { gql } from '@urql/core'

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $currentPassword: String!) {
    changePassword(password: $password, currentPassword: $currentPassword) {
      accessToken
    }
  }
`
