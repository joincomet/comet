import { ApolloClient, InMemoryCache, from } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import toast from 'react-hot-toast'
import { isLiveQueryOperationDefinitionNode } from '@n1ru4l/graphql-live-query'
import { UploadLink } from '@/graphql/upload'
import i18n from '@/locales/i18n'
import { WebSocketLink } from '@/graphql/WebSocketLink'
import { setContext } from '@apollo/client/link/context'
import { offsetLimitPagination } from '@apollo/client/utilities'

const url = import.meta.env.PROD
  ? `https://${import.meta.env.VITE_API_DOMAIN}/graphql`
  : 'http://localhost:4000/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      if (
        message !==
        'Access denied! You need to be authorized to perform this action!'
      )
        toast.error(i18n.t(message))
    })
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    toast.error(networkError.message)
  }
})

const httpLink = new UploadLink({
  uri: url,
  headers: { token: localStorage.getItem('token') }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: token
      ? {
          ...headers,
          token
        }
      : headers
  }
})

const webSocketLink = new WebSocketLink()

const splitLink = new RetryLink().split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      (definition.operation === 'subscription' ||
        isLiveQueryOperationDefinitionNode(definition))
    )
  },
  webSocketLink,
  authLink.concat(httpLink)
)

const finalLink = from([errorLink, splitLink])

export const apolloClient = new ApolloClient({
  link: finalLink,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          servers: {
            merge: false
          }
        }
      }
    }
  })
})
