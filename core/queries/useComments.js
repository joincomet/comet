import { gql } from 'graphql-request'
import { useQuery } from 'react-query'
import { request } from '../network/request'

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

const countChildren = comment => {
  if (!comment.childComments || comment.childComments.length === 0) return 0
  let count = 0
  comment.childComments.forEach(c => {
    count++
    c.childCount = countChildren(c)
    count += c.childCount
  })
  return count
}

export const fetchComments = async ({ queryKey }) => {
  const [_key, variables] = queryKey

  let { comments } = await request(
    gql`
      query comments($postId36: ID, $sort: CommentSort) {
        comments(postId36: $postId36, sort: $sort) {
          id
          id36
          parentCommentId
          textContent
          rocketCount
          isRocketed
          author {
            id
            username
            bio
            avatarUrl
            isCurrentUser
          }
          timeSince
          timeSinceFull
          timeSinceEdited
          deleted
          removed
          removedReason
        }
      }
    `,
    variables
  )

  const commentCount = comments.length
  const users = comments
    .filter(c => !!c.author)
    .map(c => c.author)
    .filter(
      (user, index, self) => self.findIndex(t => t.id === user.id) === index
    )
  comments = unflatten(comments)
  comments.forEach(c => (c.childCount = countChildren(c)))

  return { comments, commentCount, users }
}

export const useComments = variables =>
  useQuery(['comments', variables], fetchComments)
