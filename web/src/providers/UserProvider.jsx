import { createContext, useContext, useEffect, useState } from 'react'
import { useCurrentUserQuery } from '@/graphql/queries'

export const UserContext = createContext({
  user: null,
  loading: true
})

export function UserProvider({ children }) {
  const [{ data, fetching }] = useCurrentUserQuery()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!fetching) setLoading(false)
  }, [fetching])
  return (
    <UserContext.Provider
      value={{
        user: data?.getCurrentUser,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = () => {
  const { user } = useContext(UserContext)
  return user
}
export const useCurrentUserLoading = () => {
  const { loading } = useContext(UserContext)
  return loading
}
