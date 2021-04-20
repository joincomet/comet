import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { SSELink } from '@/graphql/SSELink'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import toast from 'react-hot-toast'
import { isLiveQueryOperationDefinitionNode } from '@n1ru4l/graphql-live-query'

const url = import.meta.env.PROD
  ? `https://${import.meta.env.VITE_API_DOMAIN}/graphql`
  : 'http://localhost:4000/graphql'

const sseLink = new SSELink({
  url,
  eventSourceOptions: {
    // Ensure cookies are included with the request
    withCredentials: true
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      toast.error(message)
    })
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    toast.error(networkError.message)
  }
})

const httpLink = new HttpLink({ uri: url, credentials: 'include' })

const splitLink = new RetryLink().split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      (definition.operation === 'subscription' ||
        isLiveQueryOperationDefinitionNode(definition))
    )
  },
  sseLink,
  httpLink
)

const finalLink = from([errorLink, splitLink])

export const apolloClient = new ApolloClient({
  link: finalLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          messages: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            }
          },
          posts: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            }
          }
        }
      }
    }
  })
})
