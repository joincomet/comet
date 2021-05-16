import { useMemo } from 'react'

/**
 * @param serverId The ID of the server to check permissions
 * @param permissions Permissions to check
 * @return {boolean[]} Array of booleans representing if user has permission, same length and order as input permissions
 */
export const useHasServerPermissions = ({ server, permissions }) => {
  return useMemo(() => {
    if (!server) return permissions.map(_ => false)
    return permissions.map(perm =>
      [...(server?.permissions ?? [])].includes(perm)
    )
  }, [permissions, server])
}
