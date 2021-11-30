import { useEffect, useRef } from 'react'
import UserFoldersSidebar from '@/pages/feed/UserFoldersSidebar'
import PostsHeader from '@/components/post/PostsHeader'
import { useStore } from '@/hooks/useStore'
import Posts from '@/components/post/Posts'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import {createNotification, isNotificationsSupported} from '@/utils/createNotification'
import InfoSidebar from '@/components/ui/InfoSidebar'

export default function FeedPage() {
  const [currentUser] = useCurrentUser()
  useSetHomePage(null)

  useEffect(() => {
    if (!isNotificationsSupported()) return
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          createNotification({
            title: 'Notifications enabled!',
            icon: '/icons/icon.png'
          })
        }
      })
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Home – Comet</title>
      </Helmet>

      <Page
        header={<PostsHeader />}
        rightSidebar={<InfoSidebar />}
      >
        <Posts
          showServerName
          header={currentUser ? <CreatePostHeader /> : <div className="h-4" />}
        />
      </Page>
    </>
  )
}
