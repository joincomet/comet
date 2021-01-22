import { GraphQLClient } from 'graphql-request'

const endpoint = () => {
  if (typeof window === 'undefined') {
    return process.env.NODE_ENV === 'production'
      ? `${process.env.API_PRIVATE_URL}/graphql`
      : 'http://api:4000/graphql'
  } else {
    return process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_API_PUBLIC_URL}/graphql`
      : 'http://localhost:4000/graphql'
  }
}

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
