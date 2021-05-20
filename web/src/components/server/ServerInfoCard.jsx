import { useTranslation } from 'react-i18next'
import ServerAvatar from '@/components/server/ServerAvatar'
import ctl from '@netlify/classnames-template-literals'
import { CurrentUserDocument, useJoinServerMutation } from '@/graphql/hooks'
import { IconSpinner } from '@/components/ui/icons/IconSpinner'
import { Link, useHistory } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { IconUsers } from '@/components/ui/icons/Icons'
import { getCategoryIcon } from '@/hooks/getCategoryIcon'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

const joinBtn = ctl(`
  absolute
  cursor-pointer
  select-none
  top-32
  -mt-4
  hover:shadow-md
  z-10
  right-3
  transition
  flex
  items-center
  px-4
  h-8
  rounded-md
  text-13
  font-semibold
  bg-gray-200
  border-2
  border-gray-800
  text-gray-900
  transform
  hover:scale-105
  focus:outline-none
`)

export default function ServerInfoCard({
  server,
  shadow = false,
  className = ''
}) {
  const { t } = useTranslation()
  const CategoryIcon = getCategoryIcon(server.category)
  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.Server, server }}>
      <Link
        to={`/+${server.name}`}
        className={`${className} relative relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${
          shadow ? 'shadow-lg' : ''
        }`}
      >
        <div
          className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative bg-gradient-to-br from-red-400 to-indigo-600"
          style={
            server?.bannerUrl
              ? { backgroundImage: `url(${server?.bannerUrl})` }
              : undefined
          }
        >
          <div className="absolute left-4 -bottom-3">
            <ServerAvatar
              size={10}
              server={server}
              className="dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 transition dark:group-hover:ring-gray-850 group-hover:shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow px-4 pt-5 pb-4 h-40">
          <div className="text-lg font-semibold text-secondary">
            {server?.name}
          </div>

          <div className="text-13 text-tertiary line-clamp-3 pt-1">
            {server?.description || 'No description'}
          </div>

          <div className="flex mt-auto text-xs">
            <div className="inline-flex items-center">
              <IconUsers className="w-4 h-4 text-tertiary" />
              <div className="ml-2 text-tertiary">
                {t('server.memberCount', { count: server?.userCount ?? 0 })}
              </div>
            </div>

            <div className="ml-auto inline-flex items-center">
              <CategoryIcon className="w-4 h-4 text-tertiary" />
              <div className="ml-2 text-tertiary">{server.category}</div>
            </div>
          </div>
        </div>
      </Link>
    </ContextMenuTrigger>
  )
}
