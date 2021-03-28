import {
  createClient,
  dedupExchange,
  subscriptionExchange,
  errorExchange
} from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { makeOperation } from '@urql/core'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { devtoolsExchange } from '@urql/devtools'
import toast from 'react-hot-toast'
import { cacheExchange } from '@/graphql/cacheExchange'

const subscriptionClient = new SubscriptionClient(
  import.meta.env.PROD
    ? `wss://${import.meta.env.VITE_SERVER_DOMAIN}/graphql`
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
  url: import.meta.env.PROD
    ? `https://${import.meta.env.VITE_SERVER_DOMAIN}/graphql`
    : 'http://localhost:4000/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation
    }),
    errorExchange({
      onError(error) {
        toast.error(error.message.substring(10))
        if (import.meta.env.DEV) console.error(error)
      }
    }),
    multipartFetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation)
      }
    })
  ]
})
