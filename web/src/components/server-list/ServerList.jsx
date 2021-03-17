import React from 'react'
import Tippy from '@tippyjs/react'
import { HiHome } from 'react-icons/hi'
import { IoTelescope } from 'react-icons/io5'
import ServerAvatar from '@/components/server/ServerAvatar'
import CreateServerDialog from '@/components/server-list/CreateServerDialog'
import { NavLink, useLocation } from 'react-router-dom'
import {
  serverListItem,
  serverListItemActive,
  serverListItemDot
} from './ServerList.module.scss'
import { useJoinedServers } from '@/components/DataProvider'

export default function ServerList() {
  const { pathname } = useLocation()

  const servers = useJoinedServers()

  return (
    <>
      <div
        className={`top-0 electron:top-5.5 fixed left-0 bottom-0 flex flex-col items-center w-16 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col w-full">
          <Tippy content="Home" placement="right">
            <NavLink to="/posts" className={serverListItem}>
              <div
                className={`${serverListItemDot} hover:bg-blue-500 dark:hover:bg-blue-500 ${
                  pathname === '/'
                    ? 'bg-blue-500'
                    : 'dark:bg-gray-800 bg-gray-200'
                }`}
              >
                <HiHome
                  className={`w-5 h-5 group-hover:text-white transition ${
                    pathname === '/' ? 'text-white' : 'text-blue-500'
                  }`}
                />
              </div>
            </NavLink>
          </Tippy>

          <Tippy content="Explore" placement="right">
            <NavLink
              to="/explore"
              className={serverListItem}
              activeClassName={serverListItemActive}
            >
              <div
                className={`${serverListItemDot} hover:bg-green-500 dark:hover:bg-green-500 ${
                  pathname === '/explore'
                    ? 'bg-green-500'
                    : 'dark:bg-gray-800 bg-gray-200'
                }`}
              >
                <IoTelescope
                  className={`w-5 h-5 group-hover:text-white transition ${
                    pathname === '/explore' ? 'text-white' : 'text-green-500'
                  }`}
                />
              </div>
            </NavLink>
          </Tippy>

          <CreateServerDialog />

          {servers.length > 0 && (
            <>
              <div className="border-b-2 border-gray-200 dark:border-gray-800 h-2 mx-3 box-content" />

              {servers.map(server => (
                <Tippy key={server.id} placement="right" content={server.name}>
                  <NavLink
                    to={`/server/${server.id}`}
                    className={serverListItem}
                    activeClassName={serverListItemActive}
                  >
                    <div
                      className={`${serverListItemDot} dark:bg-gray-800 bg-gray-200`}
                    >
                      <ServerAvatar server={server} className="w-12 h-12" />
                    </div>
                  </NavLink>
                </Tippy>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
