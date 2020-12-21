import { request } from '@/lib/Request'
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

export const useSubmitPostMutation = () => useMutation(submitPost)

const submitComment = async variables => {
  const { submitComment } = await request(
    null,
    gql`
      mutation submitComment(
        $textContent: String!
        $postId: ID!
        $parentCommentId: ID
      ) {
        submitComment(
          textContent: $textContent
          postId: $postId
          parentCommentId: $parentCommentId
        ) {
          id
          id36
          parentCommentId
          textContent
          rocketCount
          author {
            username
            name
            avatarUrl
          }
          timeSince
          timeSinceEdited
        }
      }
    `,
    variables
  )
  return submitComment
}

export const useSubmitCommentMutation = () => useMutation(submitComment)
