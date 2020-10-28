export const ENDPOINT = () =>
  typeof window === 'undefined'
    ? `http://${process.env.NEXT_STAGING === 'true' ? 'api-staging' : 'api'}:4000/graphql`
    : process.env.NODE_ENV === 'production'
    ? '/graphql'
    : 'http://localhost:4000/graphql'
