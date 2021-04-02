import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        ...USER_FRAGMENT
        isAdmin
      }
    }
  }
  ${USER_FRAGMENT}
`

export const useLoginMutation = () => useMutation(LOGIN)
