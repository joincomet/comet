import Header from '@/components/ui/header/Header'
import { IconAt, IconPin } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function DmHeader({ user }) {
  const { t } = useTranslation()

  return (
    <Header
      icon={<IconAt className="w-5 h-5" />}
      title={
        <>
          {user?.name ?? ''}
          <div
            className={`w-2.5 h-2.5 ml-3 rounded-full ${
              user?.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        </>
      }
    >
      <div className="ml-auto">
        <Tippy content={t('messages.pinned')}>
          <div className="highlightable">
            <IconPin className="w-5 h-5" />
          </div>
        </Tippy>
      </div>
    </Header>
  )
}
