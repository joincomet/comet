import { request } from '@/lib/network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const login = async variables => {
  const { login } = await request(
    null,
    gql`
      mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          accessToken
          user {
            id
            admin
            username
            avatarUrl
          }
        }
      }
    `,
    variables
  )
  return login
}

export const useLoginMutation = options => useMutation(login, options)

const signUp = async variables => {
  const { signUp } = await request(
    null,
    gql`
      mutation signUp($username: String!, $email: String, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
          accessToken
          user {
            id
            admin
            username
            avatarUrl
          }
        }
      }
    `,
    variables
  )
  return signUp
}

export const useSignUpMutation = options => useMutation(signUp, options)

const logout = async variables => {
  const { signUp } = await request(
    null,
    gql`
      mutation logout {
        logout
      }
    `,
    variables
  )
  return signUp
}

export const useLogoutMutation = options => useMutation(logout, options)
