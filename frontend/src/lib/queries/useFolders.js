import { gql } from 'graphql-request'
import { request } from '@/lib/network/request'
import { useQuery } from 'react-query'

export const fetchFolders = async (ctx = null) => {
  const { folders } = await request(
    ctx,
    gql`
      query folders {
        folders {
          id
          avatarUrl
          color
          name
        }
      }
    `
  )
  return folders
}

export const useFolders = () =>
  useQuery('folders', fetchFolders, { refetchOnWindowFocus: true })
