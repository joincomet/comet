import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '@/lib/Request'

const unflatten = comments => {
  const hashTable = Object.create(null)
  comments.forEach(
    comment => (hashTable[comment.id] = { ...comment, childComments: [] })
  )
  const commentTree = []
  comments.forEach(comment => {
    if (comment.parentCommentId)
      hashTable[comment.parentCommentId].childComments.push(
        hashTable[comment.id]
      )
    else commentTree.push(hashTable[comment.id])
  })
  return commentTree
}

export const fetchComments = async ({ queryKey }, ctx = null) => {
  const [_key, variables] = queryKey

  const { comments } = await request(
    ctx,
    gql`
      query comments($postId: ID, $username: String, $sort: CommentSort) {
        comments(postId: $postId, username: $username, sort: $sort) {
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

  return unflatten(comments)
}

export const useComments = variables =>
  useQuery(['comments', variables], fetchComments)
