import { IconPin } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function PinnedMessagesButton() {
  const { t } = useTranslation()

  return (
    <Tippy content={t('message.pinned')}>
      <div className="highlightable">
        <IconPin className="w-5 h-5" />
      </div>
    </Tippy>
  )
}
