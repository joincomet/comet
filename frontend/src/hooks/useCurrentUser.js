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
          avatarURL
          admin
        }
      }
    `
  )
  return posts || null
}

export const useCurrentUser = () => {
  return useQuery(['currentUser'], fetchCurrentUser)
}
