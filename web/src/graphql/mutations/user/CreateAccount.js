import { gql } from '@urql/core'
import { USER_FRAGMENT } from '@/graphql/fragments'

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!, $password: String!) {
    createAccount(name: $name, email: $email, password: $password) {
      accessToken
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`
