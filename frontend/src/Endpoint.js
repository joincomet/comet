export const ENDPOINT = () =>
  typeof window === 'undefined'
    ? 'http://api:4000/graphql'
    : process.env.NODE_ENV === 'production'
    ? `${new URL(location.href).origin}/graphql`
    : 'http://localhost:4000/graphql'
