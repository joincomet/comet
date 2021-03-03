import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import { HiHome } from 'react-icons/hi'
import { IoTelescope } from 'react-icons/io5'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import CreatePlanetDialog from '@/components/planet-scroller/CreatePlanetDialog'
import { NavLink, useLocation } from 'react-router-dom'
import {
  planetScrollerItem,
  planetScrollerItemActive,
  planetScrollerItemDot
} from './PlanetScroller.module.scss'
import { useQuery } from 'urql'
import { CURRENT_USER_QUERY, useCurrentUserQuery } from '@/graphql/queries'

export default function PlanetScroller() {
  const [
    {
      data: {
        currentUser: { planets }
      }
    }
  ] = useCurrentUserQuery()

  const { pathname } = useLocation()

  return (
    <>
      <div
        className={`top-0 electron:top-5.5 fixed left-0 bottom-0 flex flex-col items-center w-16 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col w-full">
          <Tippy content="Home" placement="right">
            <NavLink to="/home" className={planetScrollerItem}>
              <div
                className={`${planetScrollerItemDot} hover:bg-blue-500 dark:hover:bg-blue-500 ${
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
              className={planetScrollerItem}
              activeClassName={planetScrollerItemActive}
            >
              <div
                className={`${planetScrollerItemDot} hover:bg-green-500 dark:hover:bg-green-500 ${
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

          <CreatePlanetDialog />

          {planets.length > 0 && (
            <>
              <div className="border-b-2 border-gray-200 dark:border-gray-800 h-2 mx-3 box-content" />

              {planets.map(planet => (
                <Tippy key={planet.id} placement="right" content={planet.name}>
                  <NavLink
                    to={`/planet/${planet.id}`}
                    className={planetScrollerItem}
                    activeClassName={planetScrollerItemActive}
                  >
                    <div
                      className={`${planetScrollerItemDot} dark:bg-gray-800 bg-gray-200`}
                    >
                      <PlanetAvatar planet={planet} className="w-12 h-12" />
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
