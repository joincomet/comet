import { useQuery, gql } from '@apollo/client'

const PLANET_QUERY = gql`
  query planet($name: String!) {
    planet(name: $name) {
      id
      name
      description
      avatarUrl
      bannerUrl
      userCount
      galaxy
      banned
      banReason
      featured
      moderators {
        id
        username
        bio
        avatarUrl
        bannerUrl
        isCurrentUser
      }
      users {
        id
        username
        bio
        avatarUrl
        bannerUrl
        isCurrentUser
      }
      channels {
        id
        name
      }
    }
  }
`
