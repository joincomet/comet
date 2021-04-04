import {useMemo} from 'react'
import {GET_SERVER_PERMISSIONS} from '@/graphql/queries'
import {useCurrentUser} from '@/providers/UserProvider'
import {useQuery} from 'urql'

/**
 * @param serverId The ID of the server to check permissions
 * @param permissions Permissions to check
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasServerPermissions = ({ serverId, permissions }) => {
  const user = useCurrentUser()
  const [{ data }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId },
    pause: !serverId
  })
  return useMemo(() => {
    if (user.isAdmin) return permissions.map(_ => true)
    const perms = data?.getServerPermissions ?? []
    return permissions.map(p => perms.includes(p))
  }, [user.isAdmin, permissions, data?.getServerPermissions])
}
