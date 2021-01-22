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
          admin
          username
          avatarUrl
          postCount
          rocketCount
          isOnline
          name
          isCurrentUser
          moderatedPlanets {
            id
          }
        }
      }
    `
  )
  return currentUser
}

export const useCurrentUser = () =>
  useQuery('currentUser', fetchCurrentUser, { refetchInterval: 5 * 60 * 1000 }) // refetch every 5 mins to update lastLogin/isOnline
