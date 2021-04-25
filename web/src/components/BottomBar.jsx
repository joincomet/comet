import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import {
  IconBell,
  IconDownload,
  IconDownloadLarge,
  IconFolder,
  IconSearch,
  IconSettings
} from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useEffect, useState } from 'react'
import UserSettingsDialog from '@/components/user/UserSettingsDialog'
import { version } from '../../package.json'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'

export default function BottomBar() {
  const [currentUser] = useCurrentUser()
  const offset = [0, 14]
  const [open, setOpen] = useState(false)
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
    <>
      <UserSettingsDialog open={open} setOpen={setOpen} />

      <div className="flex items-center px-5 bottom-0 h-5.5 bg-gray-650 z-50">
        <UserAvatar size={4.5} className="mr-2" user={currentUser} />
        <div className="dark:text-white text-sm">{currentUser.name}</div>
        <div className="w-2 h-2 rounded-full bg-green-500 ml-2" />
        <div className="ml-auto flex items-center space-x-4 text-primary">
          <Tippy
            content={`${
              window.electron && updateAvailable
                ? 'Update available'
                : 'Up to date!'
            }`}
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (window.electron && updateAvailable) {
                  window.electron.restart()
                }
              }}
            >
              <div
                className={`text-xs font-medium ${
                  updateAvailable ? 'text-green-500' : 'text-tertiary'
                }`}
              >
                v{version}
              </div>

              {window.electron && updateAvailable && (
                <div className="pl-2">
                  <IconDownload className="w-4.5 h-4.5 text-green-500 cursor-pointer animate-bounce" />
                </div>
              )}
            </div>
          </Tippy>

          <Tippy content="Search" offset={offset}>
            <div>
              <IconSearch className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy>

          <Tippy content="Folders" offset={offset}>
            <div>
              <IconFolder className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy>

          <Tippy content="Notifications" offset={offset}>
            <div>
              <IconBell className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy>

          <Tippy content="Settings" offset={offset}>
            <div onClick={() => setOpen(true)}>
              <IconSettings className="w-4.5 h-4.5 cursor-pointer" />
            </div>
          </Tippy>
        </div>
      </div>
    </>
  )
}
