import { request } from '../network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const login = async variables => {
  const { login } = await request(
    gql`
      mutation login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
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
