import { request } from '@/lib/Request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const togglePostRocket = async variables => {
  const { togglePostRocket } = await request(
    null,
    gql`
      mutation togglePostRocket($postId: ID!) {
        togglePostRocket(postId: $postId)
      }
    `,
    variables
  )
  return togglePostRocket
}

export const useTogglePostRocketMutation = () => useMutation(togglePostRocket)
