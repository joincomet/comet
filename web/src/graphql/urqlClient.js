import {
  createClient,
  dedupExchange,
  subscriptionExchange,
  errorExchange
} from 'urql'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { devtoolsExchange } from '@urql/devtools'
import toast from 'react-hot-toast'
import { cacheExchange } from '@/graphql/cacheExchange'
import i18n from '@/i18n/i18n'

export const subscriptionClient = new SubscriptionClient(
  import.meta.env.PROD
    ? `wss://${import.meta.env.VITE_SERVER_DOMAIN}/graphql`
    : 'ws://localhost:4000/graphql',
  {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem('token')
      return {
        token
      }
    }
  }
)

export const urqlClient = createClient({
  url: import.meta.env.PROD
    ? `https://${import.meta.env.VITE_SERVER_DOMAIN}/graphql`
    : 'http://localhost:4000/graphql',
  requestPolicy: 'cache-and-network',
  fetchOptions: () => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        token
      }
    }
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    errorExchange({
      onError(error, operation) {
        if (import.meta.env.DEV) console.error({ error, operation })
        const message = error.message.substring(10)
        if (error.replace) {
          toast.error(i18n.t(message, { replace: error.replace }))
        } else {
          toast.error(i18n.t(message))
        }
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
