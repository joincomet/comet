import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const followUser = async variables => {
  await request(
    null,
    gql`
      mutation followUser($followedId: ID!) {
        followUser(followedId: $followedId)
      }
    `,
    variables
  )
}

export const useFollowUserMutation = () => useMutation(followUser)

const unfollowUser = async variables => {
  await request(
    null,
    gql`
      mutation unfollowUser($followedId: ID!) {
        unfollowUser(followedId: $followedId)
      }
    `,
    variables
  )
}

export const useUnfollowUserMutation = () => useMutation(unfollowUser)
