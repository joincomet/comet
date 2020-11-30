import { ENDPOINT } from '@/Endpoint'
import { gql, request } from 'graphql-request'
import { useMutation } from 'react-query'

export const login = async ({ username, password }) => {
  const { login } = await request(
    ENDPOINT(),
    gql`
    mutation Login {
      login(username: "${username}", password: "${password}") {
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
    `
  )
  return login
}

export const signUp = async ({ username, email, password }) => {
  const { signUp } = await request(
    ENDPOINT(),
    gql`
      mutation SignUp {
        signUp(username: "${username}", email: "${email}", password: "${password}") {
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
    `
  )
  return signUp
}

export const getCurrentUser = async () => {
  const { currentUser } = await request(
    ENDPOINT(),
    gql`
      query CurrentUser {
        currentUser {
          id
          admin
          username
          avatarURL
          profile {
            realName
          }
        }
      }
    `
  )
  return currentUser
}

export const getUserFromToken = async accessToken => {
  const { currentUser } = await request(
    ENDPOINT(),
    gql`
      query {
        getUserFromToken(accessToken: "${accessToken}") {
          id
          admin
          username
          avatarURL
          profile {
            realName
          }
        }
      }
    `
  )
  return currentUser
}
