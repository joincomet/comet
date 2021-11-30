import { useStore } from '@/hooks/useStore'
import { IconUsers } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function ShowUsersButton() {
  const [showUsers, setShowUsers] = useStore(s => [s.showRightSidebar, s.setShowRightSidebar])
  const { t } = useTranslation()

  return (
    <Tippy content={showUsers ? t('user.hideUsers') : t('user.showUsers')}>
      <div className="highlightable" onClick={() => setShowUsers(!showUsers)}>
        <IconUsers className="w-5 h-5" />
      </div>
    </Tippy>
  )
}
