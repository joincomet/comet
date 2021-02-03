import { gql } from 'graphql-request'
import { request } from '../network/request'
import { useQuery } from 'react-query'

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
