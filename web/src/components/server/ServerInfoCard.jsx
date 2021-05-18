import { useTranslation } from 'react-i18next'
import ServerAvatar from '@/components/server/ServerAvatar'
import ctl from '@netlify/classnames-template-literals'
import { CurrentUserDocument, useJoinServerMutation } from '@/graphql/hooks'
import { IconSpinner } from '@/components/ui/icons/IconSpinner'
import { Link, useHistory } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

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
  const [currentUser] = useCurrentUser()
  const { t } = useTranslation()

  const [joinServer, { loading: joinLoading }] = useJoinServerMutation({
    update(cache, { data: { joinServer } }) {
      const data = cache.readQuery({ query: CurrentUserDocument })
      cache.writeQuery({
        query: CurrentUserDocument,
        data: {
          user: { ...data.user, servers: [joinServer, ...data.user.servers] }
        }
      })
    }
  })

  const { push } = useHistory()

  return (
    <Link
      to={`/+${server.name}`}
      className={`${className} relative relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${
        shadow ? 'shadow-lg' : ''
      }`}
    >
      <button
        type="button"
        className={joinBtn}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          if (!!currentUser && !server.isJoined) {
            joinServer({ variables: { input: { serverId: server.id } } })
          } else {
            push(`/+${server.name}`)
          }
        }}
      >
        {!currentUser || server.isJoined ? 'View' : 'Join'}
        {joinLoading && <IconSpinner className="w-4 h-4 text-gray-900 ml-2" />}
      </button>

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

      <div className="flex flex-col flex-grow px-4 pt-7 pb-4 h-40">
        <div className="text-base font-medium text-secondary">
          {server?.name}
        </div>

        <div className="text-13 text-tertiary line-clamp-3 pt-1">
          {server?.description || 'No description'}
        </div>

        <div className="flex space-x-6 mt-auto text-xs">
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            <div className="ml-1.5 text-green-600">
              {t('server.onlineCount', { count: server?.onlineCount ?? 0 })}
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="ml-1.5 text-tertiary">
              {t('server.memberCount', { count: server?.userCount ?? 0 })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
