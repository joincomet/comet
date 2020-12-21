import { gql } from 'graphql-request'
import { request } from '@/lib/Request'
import { useQuery } from 'react-query'

export const fetchCurrentUser = async (ctx = null) => {
  const { currentUser } = await request(
    ctx,
    gql`
      query currentUser {
        currentUser {
          id
          id36
          admin
          username
          avatarUrl
          postCount
          followerCount
          followingCount
          rocketCount
          name
        }
      }
    `
  )
  return currentUser
}

export const useCurrentUser = () => useQuery(['currentUser'], fetchCurrentUser)
