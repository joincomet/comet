import { request } from '@/lib/network/request'
import { gql } from 'graphql-request'
import { useMutation } from 'react-query'

const submitPost = async variables => {
  const { submitPost } = await request(
    null,
    gql`
      mutation submitPost(
        $title: String
        $link: String
        $textContent: String
        $planetName: String
        $images: [Upload!]
      ) {
        submitPost(
          title: $title
          link: $link
          textContent: $textContent
          planetName: $planetName
          images: $images
        ) {
          id
          id36
          relativeUrl
        }
      }
    `,
    variables
  )
  return submitPost
}

export const useSubmitPostMutation = options => useMutation(submitPost, options)

const pinPost = async variables => {
  await request(
    null,
    gql`
      mutation pinPost($planetId: ID!, $postId: ID!) {
        pinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const usePinPostMutation = options => useMutation(pinPost, options)

const unpinPost = async variables => {
  await request(
    null,
    gql`
      mutation unpinPost($planetId: ID!, $postId: ID!) {
        unpinPost(planetId: $planetId, postId: $postId)
      }
    `,
    variables
  )
}

export const useUnpinPostMutation = options => useMutation(unpinPost, options)

const deletePost = async variables => {
  await request(
    null,
    gql`
      mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
      }
    `,
    variables
  )
}

export const useDeletePostMutation = options => useMutation(deletePost, options)

const rocketPost = async variables => {
  await request(
    null,
    gql`
      mutation rocketPost($postId: ID!) {
        rocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useRocketPostMutation = options => useMutation(rocketPost, options)

const unrocketPost = async variables => {
  await request(
    null,
    gql`
      mutation unrocketPost($postId: ID!) {
        unrocketPost(postId: $postId)
      }
    `,
    variables
  )
}

export const useUnrocketPostMutation = options =>
  useMutation(unrocketPost, options)

const editPost = async variables => {
  await request(
    null,
    gql`
      mutation editPost($postId: ID!, $newTextContent: String!) {
        editPost(postId: $postId, newTextContent: $newTextContent)
      }
    `,
    variables
  )
}

export const useEditPostMutation = options => useMutation(editPost, options)
