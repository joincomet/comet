export const ENDPOINT = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_STAGING === 'true' ? 'http://api-staging:4001/graphql' : 'http://api:400/graphql'
  } else {
    return process.env.NODE_ENV === 'production' ? `https://${new URL(location.href).hostname}/graphql` : 'http://localhost:4000/graphql'
  }
}
