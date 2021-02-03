import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '../network/request'

export const fetchPlanets = async ({ queryKey }) => {
  const [_key, variables] = queryKey
  const { planets } = await request(
    gql`
      query planets(
        $sort: PlanetSort
        $joinedOnly: Boolean
        $galaxy: Galaxy
        $page: Int
        $pageSize: Int
      ) {
        planets(
          sort: $sort
          joinedOnly: $joinedOnly
          galaxy: $galaxy
          page: $page
          pageSize: $pageSize
        ) {
          page
          nextPage
          planets {
            id
            name
            avatarUrl
            bannerUrl
            userCount
            isJoined
            galaxy
            timeSince
            description
            featured
          }
        }
      }
    `,
    variables
  )
  return planets
}

export const usePlanets = variables =>
  useQuery(['planets', variables], fetchPlanets)
