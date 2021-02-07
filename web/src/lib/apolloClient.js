import {
  createHttpLink,
  split,
  InMemoryCache,
  ApolloClient
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.APP_DOMAIN}/${process.env.SERVER_PATH}/graphql`
      : 'http://localhost:4000/graphql'
})

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `wss://${process.env.APP_DOMAIN}/${process.env.SERVER_PATH}/graphql`
      : 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem('token')
    }
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      /*console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )*/
      toast.error(message)
    })

  if (networkError) {
    //console.log(`[Network error]: ${networkError}`)
    toast.error(networkError)
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  errorLink.concat(wsLink),
  authLink.concat(errorLink).concat(httpLink)
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
