export const endpoint = () => {
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
