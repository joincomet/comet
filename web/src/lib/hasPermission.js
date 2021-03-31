import { useUser } from '@/components/providers/DataProvider'
import { useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useParams } from 'react-router-dom'

export const useHasServerPermissions = (permissions, serverId) => {
  if (!serverId) return permissions.map(_ => false)
  const user = useUser()
  const [{ data }] = useQuery({
    query: GET_SERVER_PERMISSIONS,
    variables: { serverId }
  })
  const perms = data?.getServerPermissions ?? []
  const res = []
  for (const perm of permissions) {
    res.push(user.isAdmin || perms.includes(perm))
  }
  return res
}
