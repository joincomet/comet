import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'

export default function PostUsersSidebar({ post, users = [] }) {
  const { t } = useTranslation()
  const showUsers = useStore(s => s.showUsers)

  return (
    <Sidebar right show={showUsers}>
      <div className="px-1">
        {post?.author && (
          <>
            <SidebarLabel>{t('post.creator')}</SidebarLabel>
            <SidebarUser
              user={post.author}
              color={post.serverUser?.role?.color}
              role={post.serverUser?.role}
            />
          </>
        )}

        {users && users.length > 0 && (
          <>
            <SidebarLabel>
              {t('post.participantCount', { count: users.length })}
            </SidebarLabel>
            {users.map(user => (
              <SidebarUser
                key={user.user.id}
                user={user.user}
                color={user.serverUser?.role?.color}
                role={user.serverUser?.role}
              />
            ))}
          </>
        )}
      </div>
    </Sidebar>
  )
}
