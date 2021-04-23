import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ServerAvatar from '@/components/server/ServerAvatar'

export default function ServerInfoCard({
  server,
  shadow = false,
  className = ''
}) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/server/${server?.id}`}
      className={`${className} cursor-pointer relative flex flex-col w-full rounded-lg group dark:bg-gray-800 dark:hover:bg-gray-850 duration-200 transform transition hover:shadow-xl ${
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
        <ServerAvatar
          size={10}
          server={server}
          className="dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 transition dark:group-hover:ring-gray-850 group-hover:shadow-md -bottom-3 left-4 absolute"
        />
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
