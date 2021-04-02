import { COMMENT_FRAGMENT, POST_FRAGMENT } from '@/graphql/fragments'
import {
  GET_COMMENTS,
  GET_CURRENT_USER,
  GET_MESSAGES,
  GET_POSTS,
  GET_SERVER_CHANNELS
} from '@/graphql/queries'
import { cacheExchange as ce } from '@urql/exchange-graphcache'
import { simplePagination } from '@urql/exchange-graphcache/extras'
import { subscriptionClient } from '@/graphql/urqlClient'

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
    pinPost: ({ postId: id }) => {
      return {
        __typename: 'Post',
        id,
        isPinned: true
      }
    },
    unpinPost: ({ postId: id }) => {
      return {
        __typename: 'Post',
        id,
        isPinned: false
      }
    },
    removePost: ({ postId: id, reason }, cache) => {
      removePostFromGetPosts(id, cache)
      return {
        __typename: 'Post',
        id,
        isPinned: false,
        isRemoved: true,
        text: `[removed${reason ? `: ${reason}` : ''}]`
      }
    },
    deletePost: ({ postId: id }, cache) => {
      removePostFromGetPosts(id, cache)
      return {
        __typename: 'Post',
        id,
        isPinned: false,
        isDeleted: true,
        text: '[deleted]'
      }
    },
    createPostVote: ({ postId: id }, cache) => {
      const post = cache.readFragment(POST_FRAGMENT, { id })
      return {
        __typename: 'Post',
        id,
        isVoted: true,
        voteCount: post.voteCount + 1
      }
    },
    removePostVote: ({ postId: id }, cache) => {
      const post = cache.readFragment(POST_FRAGMENT, { id })
      return {
        __typename: 'Post',
        id,
        isVoted: false,
        voteCount: post.voteCount - 1
      }
    },
    createCommentVote: ({ commentId: id }, cache) => {
      const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
      return {
        __typename: 'Comment',
        id,
        isVoted: true,
        voteCount: comment.voteCount + 1
      }
    },
    removeCommentVote: ({ commentId: id }, cache) => {
      const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
      return {
        __typename: 'Post',
        id,
        isVoted: false,
        voteCount: comment.voteCount - 1
      }
    }
  },
  updates: {
    Mutation: {
      login({ login: { accessToken, user } }, _variables, cache) {
        localStorage.setItem('token', accessToken)
        subscriptionClient.close()
        cache.updateQuery({ query: GET_CURRENT_USER }, data => {
          data.getCurrentUser = user
          return data
        })
      },
      createAccount(
        { createAccount: { accessToken, user } },
        _variables,
        cache
      ) {
        localStorage.setItem('token', accessToken)
        subscriptionClient.close()
        cache.updateQuery({ query: GET_CURRENT_USER }, data => {
          data.getCurrentUser = user
          return data
        })
      },
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
      },
      createChannel({ createChannel: channel }, { serverId }, cache) {
        cache.updateQuery(
          {
            query: GET_SERVER_CHANNELS,
            variables: {
              serverId
            }
          },
          data => {
            if (data) {
              data.getServerChannels.unshift(channel)
              return data
            } else {
              return null
            }
          }
        )
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
                  pageSize: 100,
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
