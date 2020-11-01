export const ENDPOINT = () => {
  if (typeof window === 'undefined') {
    return 'http://api:4000/graphql'
  } else {
    return process.env.NODE_ENV === 'production' ? `https://${new URL(location.href).hostname}/graphql` : 'http://localhost:4000/graphql'
  }
}
