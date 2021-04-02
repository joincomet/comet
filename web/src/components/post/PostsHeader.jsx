import Header from '@/components/ui/header/Header'
import {
  IconHot,
  IconNew,
  IconRefresh,
  IconTop
} from '@/components/ui/icons/Icons'
import { useStore } from '@/hooks/useStore'
import Tippy from '@tippyjs/react'
import { Switch } from '@headlessui/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import HeaderTab from '@/components/ui/header/HeaderTab'
import { HiNewspaper } from 'react-icons/hi'
import ShowFoldersButton from '@/components/ui/header/buttons/ShowFoldersButton'

const iconClassName = 'w-5 h-5'

export default function PostsHeader({ refreshPosts }) {
  const [postsSort, showFolders, liveMode] = useStore(s => [
    s.postsSort,
    s.showFolders,
    s.liveMode
  ])

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
            <Switch
              checked={liveMode}
              onChange={() => toast.error(t('feed.liveMode.comingSoon'))}
            >
              {t('feed.liveMode.title')}
            </Switch>
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
  const [postsTime, setPostsTime] = useStore(s => [s.postsTime, s.setPostsTime])
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
