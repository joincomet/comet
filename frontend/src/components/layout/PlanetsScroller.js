import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import Tippy from '@tippyjs/react'
import NavLink from '@/components/NavLink'
import { HiHome } from 'react-icons/hi'
import { IoTelescope } from 'react-icons/io5'
import React from 'react'
import { usePlanets } from '@/lib/queries/usePlanets'
import { useRouter } from 'next/router'

export default function PlanetsScroller() {
  const { data } = usePlanets({ joinedOnly: true, sort: 'AZ' })
  const planets = data ? data.planets : []

  const router = useRouter()

  return (
    <div className="slideout-menu top-0 left-0 flex flex-col items-center relative w-16 bg-white dark:bg-gray-900 space-y-2">
      <div className="relative h-full w-full py-1">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={planets.length + 2}
              itemSize={56}
              width={width}
              className="hidescroll overflow-y-auto"
            >
              {({ index, style }) => {
                const planet = planets[index - 2]

                return (
                  <div style={style}>
                    {index === 0 && (
                      <Tippy content="Home" placement="right">
                        <div className="planetscroller-item">
                          <NavLink href="/">
                            <div
                              className={`planetscroller-item-dot  hover:bg-blue-500 dark:hover:bg-blue-500 ${
                                router.pathname === '/'
                                  ? 'bg-blue-500'
                                  : 'dark:bg-gray-800 bg-gray-200'
                              }`}
                            >
                              <HiHome
                                className={`w-5 h-5  group-hover:text-white transition ${
                                  router.pathname === '/'
                                    ? 'text-white'
                                    : 'text-blue-500'
                                }`}
                              />
                            </div>
                          </NavLink>
                        </div>
                      </Tippy>
                    )}

                    {index === 1 && (
                      <Tippy content="Explore" placement="right">
                        <div className="planetscroller-item">
                          <NavLink href="/explore">
                            <div
                              className={`planetscroller-item-dot hover:bg-green-500 dark:hover:bg-green-500 ${
                                router.pathname === '/explore'
                                  ? 'bg-green-500'
                                  : 'dark:bg-gray-800 bg-gray-200'
                              }`}
                            >
                              <IoTelescope
                                className={`w-5 h-5 group-hover:text-white transition ${
                                  router.pathname === '/explore'
                                    ? 'text-white'
                                    : 'text-green-500'
                                }`}
                              />
                            </div>
                          </NavLink>
                        </div>
                      </Tippy>
                    )}

                    {index === 2 && (
                      <Tippy content="Create Planet" placement="right">
                        <div className="planetscroller-item">
                          <div
                            className={`planetscroller-item-dot dark:bg-gray-800 bg-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500`}
                          >
                            <svg
                              className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </Tippy>
                    )}

                    {index > 1 && (
                      <Tippy
                        key={planet.id}
                        placement="right"
                        content={planet.name}
                      >
                        <div className="planetscroller-item">
                          <NavLink href={`/planet/${planet.name}`}>
                            {planet.avatarUrl ? (
                              <img
                                src={planet.avatarUrl}
                                className="planetscroller-item-dot dark:bg-gray-800 bg-gray-200"
                                alt={planet.name}
                              />
                            ) : (
                              <div
                                className={`planetscroller-item-dot dark:bg-gray-800 bg-gray-200 uppercase text-xl font-medium text-tertiary`}
                              >
                                {planet.name[0]}
                              </div>
                            )}
                          </NavLink>
                        </div>
                      </Tippy>
                    )}
                  </div>
                )
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}
