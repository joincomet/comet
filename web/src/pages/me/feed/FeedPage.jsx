import { useRef } from 'react'
import UserFoldersSidebar from '@/pages/me/feed/UserFoldersSidebar'
import PostsHeader from '@/components/post/PostsHeader'
import { useStore } from '@/hooks/useStore'
import Container from '@/components/ui/Container'
import Posts from '@/components/post/Posts'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function FeedPage() {
  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }
  useSetHomePage(`feed`)
  return (
    <>
      <Helmet>
        <title>{t('post.feed.title')}</title>
      </Helmet>

      <PostsHeader refreshPosts={refreshPosts} />
      <UserFoldersSidebar show={showFolders} />

      <Container rightSidebar={showFolders}>
        <Posts showServerName />
      </Container>
    </>
  )
}
