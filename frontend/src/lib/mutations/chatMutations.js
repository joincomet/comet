import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const createDm = async variables => {
  const { createDm } = await request(
    null,
    gql`
      mutation createDm($username: String!, $password: String!) {
        createDm(username: $username, password: $password) {
          accessToken
          user {
            id
            admin
            username
            avatarUrl
            name
          }
        }
      }
    `,
    variables
  )
  return createDm
}

export const useCreateDmMutation = options => useMutation(createDm, options)
