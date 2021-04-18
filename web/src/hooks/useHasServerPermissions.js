import { useMemo } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

/**
 * @param serverId The ID of the server to check permissions
 * @param permissions Permissions to check
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasServerPermissions = ({ serverId, permissions }) => {
  const [user] = useCurrentUser()

  return useMemo(() => {
    const allTrue = permissions.map(_ => true)
    const allFalse = permissions.map(_ => false)
    if (!user) return allFalse
    if (user?.isAdmin) return allTrue
    const server = user?.servers.find(s => s.server.id === serverId)
    if (!server) return allFalse
    if (server.owner.id === user.id) return allTrue
    const roles = server.roles
    return permissions.map(p => !!roles.find(r => r.permissions.includes(p)))
  }, [permissions, user, serverId])
}
