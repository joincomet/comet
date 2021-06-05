import HeaderSearchBar from '@/components/ui/header/HeaderSearchBar'
import { IconBack } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import { useStore } from '@/hooks/useStore'
import { useHistory } from 'react-router-dom'

export default function PostHeader({ post }) {
  const canGoBack = useStore(s => s.canGoBack)
  const { push, goBack } = useHistory()

  return (
    <header
      id="header"
      className={`h-12 min-h-[3rem] items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center`}
    >
      <div
        className={`flex items-center font-semibold text-base text-primary pl-4`}
      >
        <div
          className="highlightable mr-3 cursor-pointer"
          onClick={() => {
            if (canGoBack) {
              goBack()
            } else {
              push(`/+${post?.server.name}`)
            }
          }}
        >
          <IconBack className="w-5 h-5" />
        </div>
        <span className="line-clamp-1">{post?.title}</span>
      </div>
      <div className="ml-auto pl-6 pr-4">
        <ShowUsersButton />
      </div>
    </header>
  )
}
