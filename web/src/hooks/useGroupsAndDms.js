import { useGroupsAndDmsQuery } from '@/graphql/queries'

export const useGroupsAndDms = () => {
  const [{ data }] = useGroupsAndDmsQuery()
  return data?.getGroupsAndDms ?? []
}
