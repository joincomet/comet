import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useEffect } from 'react'
import { useNotifications } from '@/lib/queries/useNotifications'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { QueryClient, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import {
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation
} from '@/lib/mutations/notificationMutations'
import { FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import UserPopup from '@/components/user/UserPopup'
import { useRouter } from 'next/router'

export default function NotificationsPage() {
  const notifications = useNotifications({ unreadOnly: true }).data
  const { setTitle } = useHeaderStore()
  useEffect(() => setTitle(`Notifications`), [])

  const { push } = useRouter()

  const queryClient = useQueryClient()

  const markRead = useMarkNotificationReadMutation({
    onMutate: ({ id }) => {
      toast.success('Dismissed!')
      queryClient.setQueryData(
        ['notifications', { unreadOnly: true }],
        notifications.filter(n => n.id !== id)
      )
    }
  })
  const markAllRead = useMarkAllNotificationsReadMutation({
    onMutate: () => {
      toast.success('Dismissed All!')
      queryClient.setQueryData(['notifications', { unreadOnly: true }], [])
    }
  })

  return (
    <div className="mt-14 mycontainer py-6 grid grid-cols-3">
      <div className="col-span-3 md:col-span-2">
        <div className="flex items-end px-3 md:px-0">
          <div className="header-2">{notifications.length} Notifications</div>
          <div
            onClick={() => markAllRead.mutate({})}
            className="header-3 ml-auto text-tertiary cursor-pointer hover:underline"
          >
            Dismiss All
          </div>
        </div>
        <div className="mt-6">
          {notifications.map((notif, index) => (
            <div
              key={notif.id}
              className="dark:bg-gray-900 md:rounded p-3 mb-3 cursor-pointer transition hover:shadow-md duration-300"
              onClick={() =>
                push(`${notif.post.relativeUrl}#${notif.comment.id36}`)
              }
            >
              <div className="flex items-center">
                <div className="tip text-tertiary">
                  <UserPopup user={notif.fromUser}>
                    <span className="cursor-pointer hover:underline">
                      @{notif.fromUser.username}
                    </span>
                  </UserPopup>{' '}
                  replied to your
                  {notif.parentCommentId ? ` comment` : ` post`}
                </div>

                <div
                  className="ml-auto inline-flex items-center tip text-tertiary cursor-pointer hover:underline"
                  onClick={e => {
                    e.stopPropagation()
                    markRead.mutate({ id: notif.id })
                  }}
                >
                  <FiCheck size={18} className="mr-3" />
                  Dismiss
                </div>
              </div>
              <div
                className="p-3 mt-2 prose prose-sm dark:prose-dark max-w-none border dark:border-gray-800 rounded"
                dangerouslySetInnerHTML={{ __html: notif.comment.textContent }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()
  await globalPrefetch(queryClient, ctx)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
