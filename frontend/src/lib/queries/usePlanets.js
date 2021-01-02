import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPlanets = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey
  const { planets } = await request(
    ctx,
    gql`
      query planets($sort: PlanetSort, $joinedOnly: Boolean) {
        planets(sort: $sort, joinedOnly: $joinedOnly) {
          id
          name
          avatarUrl
          userCount
          isJoined
          color
        }
      }
    `,
    variables
  )
  return planets
}

export const usePlanets = variables =>
  useQuery(['planets', variables], fetchPlanets)
