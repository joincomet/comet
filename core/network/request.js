import { GraphQLClient } from 'graphql-request'
import { endpoint } from './endpoint'

export const request = (query, variables = {}) => {
  const client = new GraphQLClient(endpoint, {
    credentials:
      process.env.NODE_ENV === 'production' ? 'same-origin' : 'include'
  })

  return client.request(query, variables)
}
