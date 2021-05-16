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
import { createNotification } from '@/utils/createNotification'

export default function FeedPage() {
  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)
  const [currentUser] = useCurrentUser()
  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }
  useSetHomePage(`home`)

  useEffect(() => {
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
  })

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Page
        header={<PostsHeader refreshPosts={refreshPosts} />}
        rightSidebar={<UserFoldersSidebar show={showFolders} />}
      >
        <Posts
          showServerName
          header={currentUser ? <CreatePostHeader /> : null}
        />
      </Page>
    </>
  )
}
