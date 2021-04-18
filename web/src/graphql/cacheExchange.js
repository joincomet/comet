import { cacheExchange as ce } from '@urql/exchange-graphcache'
import { simplePagination } from '@urql/exchange-graphcache/extras'
import schema from '../../../schema.json'
import {
  ChannelFragmentDoc,
  CommentsDocument,
  CurrentUserDocument,
  MessagesDocument
} from '@/graphql/hooks'

export const cacheExchange = ce({
  schema,
  keys: {
    PostsResponse: () => null,
    MessagesResponse: () => null,
    LinkMetadata: () => null,
    Image: i => i.originalUrl,
    File: f => f.url
  },
  resolvers: {
    Query: {
      messages: simplePagination({
        offsetArgument: 'page',
        limitArgument: 'pageSize',
        mergeMode: 'before'
      }),
      posts: simplePagination({
        offsetArgument: 'page',
        limitArgument: 'pageSize',
        mergeMode: 'after'
      })
    }
  },
  updates: {
    Mutation: {
      login({ login: { accessToken, user } }, _variables, cache) {
        localStorage.setItem('token', accessToken)
        cache.updateQuery({ query: CurrentUserDocument }, data => {
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
        cache.updateQuery({ query: CurrentUserDocument }, data => {
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
                query: CommentsDocument,
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
            query: CurrentUserDocument
          },
          data => {
            if (data) {
              data.servers
                .find(s => s.server.id === serverId)
                .channels.unshift(channel)
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
            query: CurrentUserDocument
          },
          data => {
            if (data) {
              data.servers.unshift(server)
              return data
            } else {
              return null
            }
          }
        )
      }
    },
    Subscription: {
      messageChanged(
        { messageChanged: { added, updated, deleted } },
        _variables,
        cache
      ) {
        if (added) {
          const message = added
          const [userId, groupId, channelId] = [
            message.toUser.id,
            message.group.id,
            message.channel.id
          ]
          let variables
          if (userId) {
            variables = { userId }
          }
          if (groupId) {
            variables = { groupId }
          }
          if (channelId) {
            variables = { channelId }
            const channel = cache.readFragment(ChannelFragmentDoc, {
              id: channelId
            })
            cache.writeFragment(ChannelFragmentDoc, {
              ...channel,
              isUnread: true
            })
          }

          const fields = cache
            .inspectFields('Query')
            .filter(field => field.fieldName === 'getMessages')
          if (!fields?.length) return
          const field = fields[fields.length - 1]

          cache.updateQuery(
            {
              query: MessagesDocument,
              variables: {
                ...variables,
                pageSize: 100,
                page: 0,
                initialTime: field.arguments.initialTime
              }
            },
            data => {
              if (data !== null) {
                data.messages[data.messages.length - 1].messages.push(message)
                return data
              } else {
                return null
              }
            }
          )
        }
      }
    }
  }
})
