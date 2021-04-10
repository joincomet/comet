import HeaderSearchBar from '@/components/ui/header/HeaderSearchBar'
import { useEffect } from 'react'
import { useStore } from '@/hooks/useStore'
import { IconDownloadLarge } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function Header({
  children,
  className,
  icon,
  title,
  showDivider = false
}) {
  const { t } = useTranslation()
  const [updateAvailable, setUpdateAvailable] = useStore(s => [
    s.updateAvailable,
    s.setUpdateAvailable
  ])
  useEffect(() => {
    if (window.electron) {
      window.electron.on('updateAvailable', () => {
        setUpdateAvailable(true)
      })
    }
  }, [])
  return (
    <header
      id="header"
      className={`h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex`}
    >
      <div
        className={`flex items-center font-semibold text-base text-primary pl-4 pr-4 ${
          showDivider ? 'border-r dark:border-gray-700 mr-4' : ''
        }`}
      >
        <div className="text-tertiary mr-3">{icon}</div>
        {title}
      </div>
      <div className="flex-grow flex items-center min-w-0 pr-4">{children}</div>
      <div className="flex w-60 min-w-[15rem] pr-4">
        <HeaderSearchBar />
        {window.electron && updateAvailable && (
          <Tippy content={t('updateAvailable')}>
            <div className="pl-4" onClick={() => window.electron.restart()}>
              <IconDownloadLarge className="w-6 h-6 text-green-500 cursor-pointer" />
            </div>
          </Tippy>
        )}
      </div>
    </header>
  )
}
