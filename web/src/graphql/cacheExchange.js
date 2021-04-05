import { COMMENT_FRAGMENT, POST_FRAGMENT } from '@/graphql/fragments'
import {
  GET_COMMENTS,
  GET_CURRENT_USER,
  GET_JOINED_SERVERS,
  GET_MESSAGES,
  GET_POSTS,
  GET_SERVER_CHANNELS
} from '@/graphql/queries'
import { cacheExchange as ce } from '@urql/exchange-graphcache'
import { simplePagination } from '@urql/exchange-graphcache/extras'
import { subscriptionClient } from '@/graphql/urqlClient'
import schema from '../../../schema.json'

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
          data.getPosts.forEach(res => {
            res.post = res.posts.filter(post => post.id !== postId)
          })
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
          data.getMessages.forEach(res => {
            res.message = res.messages.filter(
              message => message.id !== messageId
            )
          })
          return data
        }
      )
    })
}

export const cacheExchange = ce({
  schema,
  keys: {
    GetPostsResponse: () => null,
    GetMessagesResponse: () => null,
    LinkMetadata: () => null,
    MessageSentResponse: () => null,
    MessageRemovedResponse: () => null,
    ChannelUsersResponse: () => null,
    GetUserRelationshipsResponse: () => null,
    GetChannelPermissionsResponse: () => null
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
    votePost: ({ postId: id }, cache) => {
      const post = cache.readFragment(POST_FRAGMENT, { id })
      return {
        __typename: 'Post',
        ...post,
        isVoted: true,
        voteCount: post.voteCount + 1
      }
    },
    unvotePost: ({ postId: id }, cache) => {
      const post = cache.readFragment(POST_FRAGMENT, { id })
      return {
        __typename: 'Post',
        ...post,
        isVoted: false,
        voteCount: post.voteCount - 1
      }
    },
    voteComment: ({ commentId: id }, cache) => {
      const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
      return {
        __typename: 'Comment',
        ...comment,
        isVoted: true,
        voteCount: comment.voteCount + 1
      }
    },
    unvoteComment: ({ commentId: id }, cache) => {
      const comment = cache.readFragment(COMMENT_FRAGMENT, { id })
      return {
        __typename: 'Comment',
        ...comment,
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
      },
      createServer({ createServer: server }, _variables, cache) {
        cache.updateQuery(
          {
            query: GET_JOINED_SERVERS
          },
          data => {
            if (data) {
              data.getJoinedServers.unshift(server)
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

        const fields = cache
          .inspectFields('Query')
          .filter(field => field.fieldName === 'getMessages')
        const field = fields[fields.length - 1]
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
              data.getMessages[data.getMessages.length - 1].messages.push(
                message
              )
              return data
            } else {
              return null
            }
          }
        )
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
