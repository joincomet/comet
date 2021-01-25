import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import Tippy from '@tippyjs/react'
import NavLink from '@/components/ui/NavLink'
import { HiHome } from 'react-icons/hi'
import { IoTelescope } from 'react-icons/io5'
import React, { useState } from 'react'
import { usePlanets } from '@/lib/queries/usePlanets'
import { useRouter } from 'next/router'
import PlanetAvatar from '@/components/avatars/PlanetAvatar'
import CreatePlanetDialog from '@/components/modals/createplanet/CreatePlanetDialog'
import IconPlanetCreate from '@/components/ui/icons/IconPlanetCreate'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'

export default function LeftScroller() {
  const currentUser = useCurrentUser().data
  const { data } = usePlanets({ joinedOnly: true, sort: 'AZ' })
  const planets = data ? data.planets : []

  const { pathname, query } = useRouter()

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="slideout-menu top-0 left-0 bottom-0 flex flex-col items-center w-16 bg-white dark:bg-gray-900">
        <div className="h-full flex flex-col">
          <div className="flex flex-col flex-shrink">
            <Tippy content="Home" placement="right">
              <div
                className={`planetscroller-item ${
                  pathname === '/' ? 'planetscroller-item--active' : ''
                }`}
              >
                <NavLink href="/">
                  <div
                    className={`planetscroller-item--dot hover:bg-blue-500 dark:hover:bg-blue-500 ${
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
              </div>
            </Tippy>

            <Tippy content="Explore" placement="right">
              <div
                className={`planetscroller-item ${
                  pathname === '/explore' ? 'planetscroller-item--active' : ''
                }`}
              >
                <NavLink href="/explore">
                  <div
                    className={`planetscroller-item--dot hover:bg-green-500 dark:hover:bg-green-500 ${
                      pathname === '/explore'
                        ? 'bg-green-500'
                        : 'dark:bg-gray-800 bg-gray-200'
                    }`}
                  >
                    <IoTelescope
                      className={`w-5 h-5 group-hover:text-white transition ${
                        pathname === '/explore'
                          ? 'text-white'
                          : 'text-green-500'
                      }`}
                    />
                  </div>
                </NavLink>
              </div>
            </Tippy>

            <div className="border-b-2 border-gray-200 dark:border-gray-800 h-2 mx-3 box-content" />
          </div>

          <div className="flex flex-col flex-grow">
            <AutoSizer disableWidth>
              {({ height }) => (
                <List
                  height={height}
                  itemCount={currentUser ? planets.length + 1 : planets.length}
                  itemSize={56}
                  width="100%"
                  className="hidescroll overflow-y-auto"
                >
                  {({ index, style }) => {
                    if (currentUser && index === 0)
                      return (
                        <CreatePlanetDialog
                          open={open}
                          setOpen={setOpen}
                          activator={({ setOpen }) => (
                            <Tippy content="Create Planet" placement="right">
                              <div
                                className="planetscroller-item"
                                onClick={() => setOpen(true)}
                              >
                                <div
                                  className={`planetscroller-item--dot dark:bg-gray-800 bg-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500`}
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

                    const planet = planets[currentUser ? index - 1 : index]

                    return (
                      <div style={style}>
                        <Tippy
                          key={planet.id}
                          placement="right"
                          content={planet.name}
                        >
                          <div
                            className={`planetscroller-item ${
                              pathname.startsWith('/planet/[planetname]') &&
                              query.planetname === planet.name
                                ? 'planetscroller-item--active'
                                : ''
                            }`}
                          >
                            <NavLink
                              href={`/planet/${planet.name}`}
                              className="planetscroller-item--dot dark:bg-gray-800 bg-gray-200"
                            >
                              <PlanetAvatar
                                planet={planet}
                                className="w-12 h-12"
                              />
                            </NavLink>
                          </div>
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
