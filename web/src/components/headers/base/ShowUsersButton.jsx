import { useStore } from '@/lib/stores/useStore'
import { IconFolder, IconUsers } from '@/lib/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function ShowUsersButton() {
  const { showUsers, setShowUsers } = useStore()
  const { t } = useTranslation()

  return (
    <Tippy
      content={showUsers ? t('channel.hideUsers') : t('channel.showUsers')}
    >
      <div className="highlightable" onClick={() => setShowUsers(!showUsers)}>
        <IconUsers className="w-5 h-5" />
      </div>
    </Tippy>
  )
}
