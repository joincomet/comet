import { createContext, useContext, useEffect } from 'react'
import { useQuery } from 'urql'
import { GET_CURRENT_USER } from '@/graphql/queries'

export const UserContext = createContext({
  currentUser: null,
  currentUserFetching: false,
  refetchCurrentUser: null
})

export const useUser = () => {
  const { currentUser, currentUserFetching, refetchCurrentUser } = useContext(
    UserContext
  )
  return [currentUser, currentUserFetching, refetchCurrentUser]
}

export function UserProvider({ children }) {
  const [{ data: currentUserData, fetching }, refetchCurrentUser] = useQuery({
    query: GET_CURRENT_USER
  })

  // Refetch user every 30 seconds to update online status
  useEffect(() => {
    if (!fetching) {
      const id = setTimeout(
        () => refetchCurrentUser({ requestPolicy: 'network-only' }),
        30000
      )
      return () => clearTimeout(id)
    }
  }, [fetching, refetchCurrentUser])

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUserData?.getCurrentUser,
        currentUserFetching: fetching && !currentUserData,
        refetchCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
