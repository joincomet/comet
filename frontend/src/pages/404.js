import { QueryClient } from 'react-query'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { dehydrate } from 'react-query/hydration'

export default function FourOhFour() {
  return <div className="mt-14">404 not found</div>
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await globalPrefetch(queryClient, ctx)

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
