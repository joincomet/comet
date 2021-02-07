import { useQuery, gql } from '@apollo/client'

const FOLDERS_QUERY = gql`
  query folders {
    folders {
      id
      avatarUrl
      name
    }
  }
`

export const useFolders = () => {
  const { data } = useQuery(FOLDERS_QUERY)
  if (data && data.folders) return data.folders
  return []
}
