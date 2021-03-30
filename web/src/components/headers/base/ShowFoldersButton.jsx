import { useStore } from '@/lib/stores/useStore'
import { IconFolder } from '@/lib/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function ShowFoldersButton() {
  const { showFolders, setShowFolders } = useStore()
  const { t } = useTranslation()

  return (
    <Tippy content={showFolders ? t('folders.hide') : t('folders.show')}>
      <div
        className="highlightable"
        onClick={() => setShowFolders(!showFolders)}
      >
        <IconFolder className="w-5 h-5" />
      </div>
    </Tippy>
  )
}
