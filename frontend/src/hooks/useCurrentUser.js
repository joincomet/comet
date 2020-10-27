import { gql, request } from 'graphql-request'
import { useQuery } from 'react-query'
import { ENDPOINT } from '@/Endpoint'

export const fetchCurrentUser = async () => {
  const { posts } = await request(
    ENDPOINT(),
    gql`
      query CurrentUser {
        currentUser {
          id
          username
          profile {
            avatarURL
          }
          admin
        }
      }
    `
  )
  return posts
}

export const useCurrentUser = () => {
  return useQuery(['currentUser'], fetchCurrentUser)
}
