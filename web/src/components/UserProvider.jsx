import React, { createContext, useContext } from 'react'
import { useQuery, useSubscription } from 'urql'
import {
  GET_BLOCKED_USERS,
  GET_CURRENT_USER,
  GET_GROUPS_AND_DMS,
  GET_JOINED_SERVERS,
  GET_USER_FOLDERS
} from '@/graphql/queries'
import { GET_FRIEND_REQUESTS, GET_FRIENDS } from '@/graphql/queries/friend'
import LoadingScreen from '@/pages/LoadingScreen'
import {
  MESSAGE_SENT,
  REFETCH_GROUPS_AND_DMS,
  REFETCH_JOINED_SERVERS
} from '@/graphql/subscriptions'
import { REFETCH_FRIENDS } from '@/graphql/subscriptions/friend'
import { REFETCH_USER_FOLDERS } from '@/graphql/subscriptions/folder'

export const UserContext = createContext({
  currentUser: null,
  refetchCurrentUser: null
})

export const useUser = () => {
  const { currentUser, refetchCurrentUser } = useContext(UserContext)
  return [currentUser, refetchCurrentUser]
}

export function UserProvider({ children }) {
  const [
    { data: currentUserData, fetching: currentUserFetching },
    refetchCurrentUser
  ] = useQuery({
    query: GET_CURRENT_USER
  })

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUserData?.getCurrentUser,
        refetchCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
