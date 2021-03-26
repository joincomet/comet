import React, { forwardRef } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import SidebarUser from '@/components/sidebars/base/SidebarUser'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import { useTranslation } from 'react-i18next'

export default forwardRef(({ post, users = [] }, ref) => {
  const { t } = useTranslation()

  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <SidebarLabel>{t('post.creator')}</SidebarLabel>
        {post && <SidebarUser user={post.author} />}

        {users && users.length > 0 && (
          <>
            <SidebarLabel>
              {t('post.participantCount', { count: users.length })}
            </SidebarLabel>
            {users.map(user => (
              <SidebarUser key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </Sidebar>
  )
})
