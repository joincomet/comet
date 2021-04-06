import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ServerInfoCard({
  server,
  shadow = false,
  className = ''
}) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/server/${server.id}`}
      className={`${className} cursor-pointer relative flex flex-col w-full rounded-lg group dark:bg-gray-850 dark:hover:bg-gray-900 duration-200 transform transition hover:shadow-xl ${
        shadow ? 'shadow-lg' : ''
      }`}
    >
      <div
        className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative dark:bg-gray-800"
        style={
          server.bannerUrl
            ? { backgroundImage: `url(${server.bannerUrl})` }
            : undefined
        }
      >
        <div className="absolute inline-flex items-center justify-center w-12 h-12 ring-4 dark:ring-gray-850 transition rounded-full group-hover:shadow-md -bottom-3 left-4 dark:bg-gray-850">
          {server.avatarUrl ? (
            <img
              alt={server.name}
              src={server.avatarUrl}
              className="w-full h-full rounded-full"
            />
          ) : (
            <div className="header-2 text-mid">{server.name[0]}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow px-4 pt-6 pb-4 h-40">
        <div className="text-base font-medium text-secondary">
          {server.name}
        </div>

        {server.description && (
          <div className="text-13 text-tertiary line-clamp-3">
            {server.description}
          </div>
        )}

        <div className="flex space-x-6 mt-auto text-xs">
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            <div className="ml-1.5 text-green-600">
              {t('server.onlineCount', { count: server.onlineUserCount })}
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="ml-1.5 text-tertiary">
              {t('server.memberCount', { count: server.userCount })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
