import { COMMENT_FRAGMENT, POST_FRAGMENT } from '@/graphql/fragments'
import {
  GET_COMMENTS,
  GET_CURRENT_USER,
  GET_MESSAGES,
  GET_POSTS
} from '@/graphql/queries'
import { cacheExchange as ce } from '@urql/exchange-graphcache'
import { simplePagination } from '@urql/exchange-graphcache/extras'

const removePostFromGetPosts = (postId, cache) => {
  cache
    .inspectFields('Query')
    .filter(field => field.fieldName === 'getPosts')
    .forEach(field => {
      cache.updateQuery(
        {
          query: GET_POSTS,
          variables: { ...field.arguments }
        },
        data => {
          data.getPosts.posts = data.getPosts.posts.filter(
            post => post.id !== postId
          )
          return data
        }
      )
    })
}

const removeMessageFromGetMessages = (messageId, cache) => {
  cache
    .inspectFields('Query')
    .filter(field => field.fieldName === 'getMessages')
    .forEach(field => {
      cache.updateQuery(
        {
          query: GET_MESSAGES,
          variables: { ...field.arguments }
        },
        data => {
          data.getMessages.messages = data.getMessages.messages.filter(
            message => message.id !== messageId
          )
          return data
        }
      )
    })
}

const pinPost = ({ postId: id }, cache) => {
  return {
    __typename: 'Post',
    id,
    isPinned: true
  }
}

const unpinPost = ({ postId: id }, cache) => {
  return {
    __typename: 'Post',
    id,
    isPinned: false
  }
}

const removePost = ({ postId: id, reason }, cache) => {
  removePostFromGetPosts(id, cache)
  return {
    __typename: 'Post',
    id,
    isPinned: false,
    isRemoved: true,
    text: `[removed${reason ? `: ${reason}` : ''}]`
  }
}

const deletePost = ({ postId: id }, cache) => {
  removePostFromGetPosts(id, cache)
  return {
    __typename: 'Post',
    id,
    isPinned: false,
    isDeleted: true,
    text: '[deleted]'
  }
}

const createPostVote = ({ postId: id }, cache) => {
  const post = cache.readFragment(POST_FRAGMENT, { id })
  return {
    __typename: 'Post',
    id,
    isVoted: true,
    voteCount: post.voteCount + 1
  }
}

const removePostVote = ({ postId: id }, cache) => {
  const post = cache.readFragment(POST_FRAGMENT, { id })
  return {
    __typename: 'Post',
    id,
    isVoted: false,
    voteCount: post.voteCount - 1
  }
}

const createCommentVote = ({ commentId: id }, cache) => {
  const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
  return {
    __typename: 'Comment',
    id,
    isVoted: true,
    voteCount: comment.voteCount + 1
  }
}

const removeCommentVote = ({ commentId: id }, cache) => {
  const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
  return {
    __typename: 'Post',
    id,
    isVoted: false,
    voteCount: comment.voteCount - 1
  }
}

export const cacheExchange = ce({
  keys: {
    GetPostsResponse: () => null,
    LinkMetadata: () => null,
    GetMessagesResponse: () => null,
    MessageSentResponse: () => null,
    MessageRemovedResponse: () => null,
    GetFriendRequestsResponse: () => null,
    ChannelUsersResponse: () => null
  },
  resolvers: {
    Query: {
      getMessages: simplePagination({
        offsetArgument: 'page',
        limitArgument: 'pageSize',
        mergeMode: 'before'
      }),
      getPosts: simplePagination({
        offsetArgument: 'page',
        limitArgument: 'pageSize',
        mergeMode: 'after'
      })
    }
  },
  optimistic: {
    pinPost,
    unpinPost,
    removePost,
    deletePost,
    createPostVote,
    removePostVote,
    createCommentVote,
    removeCommentVote
  },
  updates: {
    Mutation: {
      createComment({ createComment: comment }, { postId }, cache) {
        cache
          .inspectFields('Query')
          .filter(field => field.fieldName === 'getComments')
          .forEach(field => {
            cache.updateQuery(
              {
                query: GET_COMMENTS,
                variables: {
                  postId,
                  sort: field.arguments.sort
                }
              },
              data => {
                if (data !== null) {
                  data.getComments.unshift(comment)
                  return data
                } else {
                  return null
                }
              }
            )
          })
      }
    },
    Subscription: {
      messageSent(
        { messageSent: { userId, groupId, channelId, message } },
        _variables,
        cache
      ) {
        let variables
        if (userId) variables = { userId }
        if (groupId) variables = { groupId }
        if (channelId) variables = { channelId }

        cache
          .inspectFields('Query')
          .filter(field => field.fieldName === 'getMessages')
          .forEach(field => {
            cache.updateQuery(
              {
                query: GET_MESSAGES,
                variables: {
                  ...variables,
                  pageSize: 50,
                  page: 0,
                  initialTime: field.arguments.initialTime
                }
              },
              data => {
                if (data !== null) {
                  data.getMessages.push(message)
                  return data
                } else {
                  return null
                }
              }
            )
          })
      },
      messageUpdated(
        { messageUpdated: { userId, groupId, channelId, message } },
        _variables,
        cache
      ) {
        // TODO
      },
      messageRemoved(
        { messageRemoved: { userId, groupId, channelId, messageId } },
        _variables,
        cache
      ) {
        // TODO
      }
    }
  }
})
