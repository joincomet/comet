import { useEffect, useRef } from 'react'
import UserFoldersSidebar from '@/pages/me/feed/UserFoldersSidebar'
import PostsHeader from '@/components/post/PostsHeader'
import { useStore } from '@/hooks/useStore'
import Posts from '@/components/post/Posts'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'

export default function FeedPage() {
  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }
  useSetHomePage(`feed`)

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          new Notification('Notifications enabled!', {
            silent: true,
            icon: '/icons/icon.png'
          })
          const audio = new Audio('/notification.mp3')
          audio.volume = 0.5
          audio.play()
        }
      })
    }
  })

  return (
    <>
      <Helmet>
        <title>{t('post.feed.title')}</title>
      </Helmet>

      <Page
        header={<PostsHeader refreshPosts={refreshPosts} />}
        rightSidebar={<UserFoldersSidebar show={showFolders} />}
      >
        <Posts showServerName header={<CreatePostHeader />} />
      </Page>
    </>
  )
}
