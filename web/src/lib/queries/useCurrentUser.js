import { useQuery, gql } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      id
      admin
      username
      name
      avatarUrl
      isOnline
      isCurrentUser
      planets {
        id
        name
        channels {
          id
          name
          description
        }
      }
    }
  }
`

export const useCurrentUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY)
  if (data && data.currentUser) return data.currentUser
  return null
}
