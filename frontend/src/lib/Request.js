import { GraphQLClient } from 'graphql-request'
import { endpoint } from '@/lib/endpoint'

export const request = (ctx, query, variables = {}) => {
  const client = new GraphQLClient(endpoint(), {
    credentials:
      process.env.NODE_ENV === 'production' ? 'same-origin' : 'include'
  })

  if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
    client.setHeader('cookie', ctx.req.headers.cookie)
  }

  return client.request(query, variables)
}
