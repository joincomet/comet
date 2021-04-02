import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($password: String!, $currentPassword: String!) {
    changePassword(password: $password, currentPassword: $currentPassword) {
      accessToken
    }
  }
`

export const useChangePasswordMutation = () => useMutation(CHANGE_PASSWORD)
