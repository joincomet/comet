import React, { useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import Tippy from '@tippyjs/react'
import { HiHome } from 'react-icons/hi'
import { IoTelescope } from 'react-icons/io5'
import { usePlanets } from '@comet/core/queries/usePlanets'
import PlanetAvatar from '@/components/avatars/PlanetAvatar'
import CreatePlanetDialog from '@/components/modals/createplanet/CreatePlanetDialog'
import IconPlanetCreate from '@/components/ui/icons/IconPlanetCreate'
import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import {
  planetScrollerItem,
  planetScrollerItemActive,
  planetScrollerItemDot
} from './PlanetScroller.module.scss'

export default function PlanetScroller() {
  const currentUser = useCurrentUser().data
  const { data } = usePlanets({ joinedOnly: true, sort: 'AZ' })
  const planets = data ? data.planets : []

  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()
  const { planetName } = useParams()

  return (
    <>
      <div
        className={`top-0 electron:top-5.5 fixed left-0 bottom-0 flex flex-col items-center w-16 bg-white dark:bg-gray-900`}
      >
        <div className="h-full flex flex-col">
          <div className="flex flex-col flex-shrink">
            <Tippy content="Home" placement="right">
              <NavLink to="/" className={planetScrollerItem}>
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

            <div className="border-b-2 border-gray-200 dark:border-gray-800 h-2 mx-3 box-content" />
          </div>

          <div className="flex flex-col flex-grow">
            <AutoSizer disableWidth>
              {({ height }) => (
                <List
                  height={height}
                  itemCount={planets.length + 1}
                  itemSize={56}
                  width="100%"
                  className="hidescroll overflow-y-auto"
                >
                  {({ index, style }) => {
                    if (index === 0)
                      return (
                        <CreatePlanetDialog
                          open={open}
                          setOpen={setOpen}
                          activator={({ setOpen }) => (
                            <Tippy content="Create Planet" placement="right">
                              <div
                                className={planetScrollerItem}
                                onClick={() => setOpen(true)}
                              >
                                <div
                                  className={`${planetScrollerItemDot} dark:bg-gray-800 bg-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500`}
                                >
                                  <IconPlanetCreate
                                    className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
                                  />
                                </div>
                              </div>
                            </Tippy>
                          )}
                        />
                      )

                    const planet = planets[index - 1]

                    return (
                      <div style={style}>
                        <Tippy
                          key={planet.id}
                          placement="right"
                          content={planet.name}
                        >
                          <NavLink
                            to={`/planet/${planet.name}`}
                            className={planetScrollerItem}
                            activeClassName={planetScrollerItemActive}
                          >
                            <NavLink
                              className={`${planetScrollerItemDot} dark:bg-gray-800 bg-gray-200`}
                            >
                              <PlanetAvatar
                                planet={planet}
                                className="w-12 h-12"
                              />
                            </NavLink>
                          </NavLink>
                        </Tippy>
                      </div>
                    )
                  }}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </>
  )
}
