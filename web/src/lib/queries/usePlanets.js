import { useQuery, gql } from '@apollo/client'

const PLANETS_QUERY = gql`
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
`

export const usePlanets = variables => {
  const { data } = useQuery(PLANETS_QUERY, { variables })
  if (data && data.planets) return data.planets
  return null
}
