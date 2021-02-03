import { gql } from 'graphql-request'
import { request } from '../network/request'
import { useQuery } from 'react-query'

export const fetchFolders = async () => {
  const { folders } = await request(
    gql`
      query folders {
        folders {
          id
          avatarUrl
          name
        }
      }
    `
  )
  return folders
}

export const useFolders = () => useQuery('folders', fetchFolders)
