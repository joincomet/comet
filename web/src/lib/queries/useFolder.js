

import { useQuery, gql } from '@apollo/client'

export const fetchFolder = async () => {
  const { folder } = await request(
    gql`
      query folder($folderId: ID!) {
        folder(folderId: $folderId) {
          id
          avatarUrl
          name
        }
      }
    `
  )
  return folder
}

export const useFolder = () => useQuery('folder', fetchFolder)
