import React, { createContext } from 'react'
import { useQuery } from 'urql'
import { GET_CURRENT_USER } from '@/graphql/queries'

export const UserContext = createContext({
  user: null
})

export function UserProvider({ children }) {
  const [{ data, fetching, error }] = useQuery({
    query: GET_CURRENT_USER
  })

  /*useEffect(() => {
    const listener = () => refetchMe();
    window.addEventListener("userLoggedIn", listener);
    return () => {
      window.removeEventListener("userLoggedIn", listener);
    };
  }, []);*/

  return (
    <UserContext.Provider
      value={{
        user: data && data.getCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
