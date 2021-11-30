import Header from '@/components/ui/header/Header'
import {
  IconHot,
  IconNew,
  IconTop
} from '@/components/ui/icons/Icons'
import { useStore } from '@/hooks/useStore'
import { useTranslation } from 'react-i18next'
import HeaderTab from '@/components/ui/header/HeaderTab'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'

const iconClassName = 'w-5 h-5'

export default function PostsHeader() {
  const [postsSort] = useStore(s => [
    s.postsSort
  ])

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
      title={postsSort}
      icon={icon}
      showDivider={postsSort === 'Top'}
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

      {/*{postsSort === 'New' && (
        <Tippy content={t('post.feed.liveMode.description')} placement="right">
          <div>
            <Switch
              checked={liveMode}
              onChange={() => toast.error(t('post.feed.liveMode.comingSoon'))}
            >
              {t('post.feed.liveMode.title')}
            </Switch>
          </div>
        </Tippy>
      )}*/}

      <div className="ml-auto space-x-5 flex items-center">
        <ShowUsersButton />
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
      {t(`post.feed.time.${time.toLowerCase()}`)}
    </HeaderTab>
  )
}
