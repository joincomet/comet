import { dehydrate } from 'react-query/hydration'

const dh = queryClient => {
  const dehydratedState = dehydrate(queryClient)
  for (const query of dehydratedState.queries) {
    if (query.state.fetchMeta === undefined) query.state.fetchMeta = null
    if (query.state.data === undefined) query.state.data = null
  }
  return dehydratedState
}

export { dh as dehydrate }
