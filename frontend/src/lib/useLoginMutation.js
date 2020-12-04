import { request } from '@/lib/Request'
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
            avatarURL
            profile {
              realName
            }
          }
        }
      }
    `,
    variables
  )
  return login
}

export const useLoginMutation = () => useMutation(login)
