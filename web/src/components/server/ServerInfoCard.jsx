import { Link } from 'react-router-dom'
import React from 'react'

export default function ServerInfoCard({
  planet,
  shadow = false,
  className = ''
}) {
  return (
    <Link
      to={`/planet/${planet.name}`}
      className={`${className} cursor-pointer relative flex flex-col w-full rounded-lg group dark:bg-gray-850 dark:hover:bg-gray-900 duration-200 transform transition hover:shadow-xl ${
        shadow ? 'shadow-lg' : ''
      }`}
    >
      <div
        className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative dark:bg-gray-800"
        style={
          planet.bannerUrl
            ? { backgroundImage: `url(${planet.bannerUrl})` }
            : undefined
        }
      >
        <div className="absolute inline-flex items-center justify-center w-12 h-12 ring-4 dark:ring-gray-850 transition rounded-full group-hover:shadow-md -bottom-3 left-4 dark:bg-gray-850">
          {planet.avatarUrl ? (
            <img
              alt={planet.name}
              src={planet.avatarUrl}
              className="w-full h-full rounded-full"
            />
          ) : (
            <div className="header-2 text-mid">{planet.name[0]}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow px-4 pt-6 pb-4 h-40">
        <div className="text-base font-medium text-secondary">
          {planet.name}
        </div>

        <div className="text-13 text-tertiary line-clamp-3">
          {planet.description || 'New CometX Planet'}
        </div>

        <div className="flex space-x-6 mt-auto text-xs">
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
            <div className="ml-1.5 text-green-600">
              {parseInt(Math.random() * planet.userCount)} online
            </div>
          </div>
          <div className="inline-flex items-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
            <div className="ml-1.5 text-tertiary">
              {planet.userCount} member
              {planet.userCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
