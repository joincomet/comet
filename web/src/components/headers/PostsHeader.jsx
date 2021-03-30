import Header from '@/components/headers/base/Header'
import { IconFolder, IconHot, IconNew, IconRefresh, IconTop } from '@/lib/Icons'
import { useStore } from '@/lib/stores/useStore'
import Tippy from '@tippyjs/react'
import { Switch } from '@headlessui/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import HeaderTab from '@/components/headers/base/HeaderTab'
import { HiNewspaper } from 'react-icons/hi'
import ShowFoldersButton from '@/components/headers/base/ShowFoldersButton'

const iconClassName = 'w-5 h-5'

export default function PostsHeader({ refreshPosts }) {
  const { postsSort, showFolders, liveMode, setLiveMode } = useStore()

  const { t } = useTranslation()

  let icon
  switch (postsSort) {
    case 'Hot':
      icon = <IconHot className={iconClassName} />
      break
    case 'New':
      icon = <IconNew className={iconClassName} />
      break
    case 'Top':
      icon = <IconTop className={iconClassName} />
      break
  }

  return (
    <Header
      isRightSidebar={showFolders}
      title={postsSort}
      icon={icon}
      showDivider={postsSort !== 'Hot'}
    >
      {postsSort === 'Top' && (
        <div className="flex items-center space-x-4">
          <TimeTab time="Hour" />
          <TimeTab time="Day" />
          <TimeTab time="Week" />
          <TimeTab time="Month" />
          <TimeTab time="Year" />
          <TimeTab time="All" />
        </div>
      )}

      {postsSort === 'New' && (
        <Tippy content={t('feed.liveMode.description')} placement="right">
          <div>
            <Switch.Group
              as="div"
              className="w-full flex items-center space-x-3"
            >
              <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
                {t('feed.liveMode.title')}
              </Switch.Label>

              <Switch
                as="button"
                checked={liveMode}
                onChange={() => toast.error(t('feed.liveMode.comingSoon'))}
                className={`${
                  liveMode ? 'bg-green-600' : 'dark:bg-gray-800'
                } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
              >
                {({ checked }) => (
                  <span
                    className={`${
                      checked
                        ? 'translate-x-5 dark:bg-green-900'
                        : 'translate-x-0 dark:bg-gray-400'
                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform rounded-full`}
                  />
                )}
              </Switch>
            </Switch.Group>
          </div>
        </Tippy>
      )}

      <div className="ml-auto space-x-5 flex items-center">
        <Tippy content={t('feed.subscriptions.show')}>
          <div
            className="highlightable"
            onClick={() => toast.error(t('feed.subscriptions.comingSoon'))}
          >
            <HiNewspaper className="w-5 h-5" />
          </div>
        </Tippy>

        <Tippy content={t('feed.refresh')}>
          <div className="highlightable" onClick={refreshPosts}>
            <IconRefresh className="w-5 h-5" />
          </div>
        </Tippy>

        <ShowFoldersButton />
      </div>
    </Header>
  )
}

function TimeTab({ time }) {
  const { t } = useTranslation()
  const { postsTime, setPostsTime } = useStore()
  return (
    <HeaderTab
      page={time}
      setCurrentPage={setPostsTime}
      currentPage={postsTime}
    >
      {t(`feed.time.${time.toLowerCase()}`)}
    </HeaderTab>
  )
}
