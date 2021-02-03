export const endpoint =
  process.env.NODE_ENV === 'production'
    ? `${process.env.API_PUBLIC_URL}/graphql`
    : 'http://localhost:4000/graphql'
