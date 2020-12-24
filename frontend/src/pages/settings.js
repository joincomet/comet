import { fetchCurrentUser, useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import UserAvatar from '@/components/user/UserAvatar'

export default function SettingsPage() {
  const currentUser = useCurrentUser().data

  return <div className="mycontainer mt-14">Settings</div>
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('currentUser', () => fetchCurrentUser(ctx))

  const currentUser = queryClient.getQueryData('currentUser')

  if (!currentUser)
    return {
      redirect: {
        destination: '/?login=true',
        permanent: false
      }
    }

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
