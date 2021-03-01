import { createClient, dedupExchange, subscriptionExchange } from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { makeOperation } from '@urql/core'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { cacheExchange } from '@urql/exchange-graphcache'
import { devtoolsExchange } from '@urql/devtools'
import { MESSAGES_QUERY } from '@/lib/queries'
import { simplePagination } from '@urql/exchange-graphcache/extras'

const subscriptionClient = new SubscriptionClient(
  process.env.NODE_ENV === 'production'
    ? `wss://${process.env.APP_DOMAIN}/${process.env.SERVER_PATH}/graphql`
    : 'ws://localhost:4000/graphql',
  {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem('token')
      return {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  }
)

const getAuth = async ({ authState }) => {
  if (!authState) {
    const token = localStorage.getItem('token')
    if (token) {
      return { token }
    }
    return null
  }
  localStorage.removeItem('token')
  return null
}

const addAuthToOperation = ({ authState, operation }) => {
  /*if (operation.kind === 'subscription') {
    console.log(operation)
    return operation
  }*/

  if (!authState || !authState.token) {
    return operation
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}
  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        authorization: `Bearer ${authState.token}`
      }
    }
  })
}

export const urqlClient = createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.APP_DOMAIN}/${process.env.SERVER_PATH}/graphql`
      : 'http://localhost:4000/graphql',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      keys: { PostsResponse: () => null },
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
        Subscription: {
          newMessage: ({ newMessage }, { channelId }, cache) => {
            cache.updateQuery(
              { query: MESSAGES_QUERY, variables: { page: 0, channelId } },
              data => {
                if (data !== null) {
                  data.messages.push(newMessage)
                  return data
                } else {
                  return null
                }
              }
            )
          }
        }
      }
    }),
    authExchange({
      getAuth,
      addAuthToOperation
    }),
    multipartFetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation)
      }
    })
  ]
})
