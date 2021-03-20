import React from 'react'
import Header from '@/components/headers/base/Header'
import { IconFolder, IconHot, IconNew, IconRefresh, IconTop } from '@/lib/Icons'
import { useStore } from '@/lib/stores/useStore'
import Tippy from '@tippyjs/react'
import { Switch } from '@headlessui/react'
import toast from 'react-hot-toast'

export default function PostsHeader({ refreshPosts }) {
  const {
    postsSort,
    showFolders,
    setShowFolders,
    liveMode,
    setLiveMode
  } = useStore()
  const className =
    'flex items-center font-semibold text-base text-secondary pr-4 border-r dark:border-gray-700 mr-4'
  const iconClassName = 'w-5 h-5 mr-3 text-tertiary'

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
        <Tippy content="Automatically add new posts to feed" placement="right">
          <div>
            <Switch.Group
              as="div"
              className="w-full flex items-center space-x-3"
            >
              <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
                Live Mode
              </Switch.Label>

              <Switch
                as="button"
                checked={liveMode}
                onChange={() => toast.error('Live Mode is coming soon!')}
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

      <div className="ml-auto pr-6 space-x-5 flex items-center">
        <Tippy content="Refresh Posts">
          <div className="highlightable" onClick={refreshPosts}>
            <IconRefresh className="w-5 h-5" />
          </div>
        </Tippy>

        <Tippy content={`${showFolders ? 'Hide' : 'Show'} Folders`}>
          <div
            className="highlightable"
            onClick={() => setShowFolders(!showFolders)}
          >
            <IconFolder className="w-5 h-5" />
          </div>
        </Tippy>
      </div>
    </Header>
  )
}

function TimeTab({ time }) {
  const { postsTime, setPostsTime } = useStore()
  return (
    <button
      onClick={() => setPostsTime(time)}
      className={`text-base rounded px-1.5 py-0.5 cursor-pointer select-none focus:outline-none ${
        time === postsTime ? 'text-secondary dark:bg-gray-700' : 'text-tertiary'
      }`}
    >
      {time}
    </button>
  )
}
