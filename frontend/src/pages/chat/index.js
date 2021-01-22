import { addApolloState, initializeApollo } from '@/lib/apolloClient'
import ChatLayout from '@/components/layout/ChatLayout'
import { withLayout } from '@moxy/next-layout'
import { usePlanets } from '@/lib/queries/usePlanets'
import { galaxiesMap } from '@/lib/galaxiesMap'
import Layout from '@/components/layout/Layout'
import {
  FiExternalLink,
  FiPlus,
  FiPlusCircle,
  FiPlusSquare,
  FiUserPlus,
  FiCalendar
} from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import React from 'react'

function ChatPage() {
  const planets = usePlanets({ sort: 'TOP' }).data || []

  const { push } = useRouter()

  return (
    <div className="dark:bg-gray-800">
      <div className="mycontainer mt-14">
        <div className="flex pt-6 pb-12">
          <div className="relative z-0 w-full max-w-screen-sm mx-auto">
            <div className="p-6 bg-white shadow md:rounded dark:bg-gray-900">
              <div className="mb-4 text-3xl font-medium">
                Explore <span className="text-blue-400">{planets.length}+</span>{' '}
                public planets
              </div>
              <input
                placeholder="Minecraft"
                className="w-full h-12 px-6 font-semibold tracking-tight transition rounded dark:bg-gray-800 focus:outline-none focus:ring-2 ring-gray-700"
              />
              {/*<div className="flex space-x-4">
                <div className="ml-auto" />
                <div className="inline-flex items-center px-4 mt-4 text-sm font-medium text-white rounded h-9 dark:bg-blue-600">
                  Create Planet
                </div>
                <div className="inline-flex items-center px-4 mt-4 text-sm font-medium text-white rounded h-9 dark:bg-blue-600">
                  Search
                </div>
              </div>*/}
            </div>
            {/*<div
              className="absolute inset-0 transform rounded -rotate-3 bg-gradient-to-br to-red-400 from-blue-500"
              style={{ zIndex: -1 }}
            />*/}
          </div>
        </div>
      </div>

      <div className="mycontainer-nopad md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4 md:gap-12">
          <div className="md:rounded group shadow dark:bg-gray-900 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
            <div className="flex flex-col items-center justify-center h-full p-6 transition group-hover:text-blue-500 text-tertiary">
              <svg className="w-16 h-16" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
                />
              </svg>
              <div className="mt-4 text-xl font-medium">Create a Planet</div>
            </div>
          </div>
          {planets.map(planet => (
            <div
              key={planet.id}
              onClick={() => push(`/chat/planet/${planet.name}`)}
              className="md:rounded group shadow dark:bg-gray-900 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="absolute inline-flex items-center justify-center w-32 h-32 transition rounded-full group-hover:shadow-md -top-3 left-4 dark:bg-gray-850">
                {planet.avatarUrl ? (
                  <img
                    src={planet.avatarUrl}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <div className="header-2 text-mid">{planet.name[0]}</div>
                )}
              </div>

              <div className="flex flex-col items-end h-32 pt-4 pl-32 pr-4 text-right">
                <div className="inline-flex items-center">
                  <div className="mr-3 font-medium text-green-600 text-13">
                    {parseInt(Math.random() * planet.userCount)} online
                  </div>
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                </div>
                <div className="inline-flex items-center">
                  <div className="mr-3 font-medium text-13 text-tertiary">
                    {planet.userCount} member{planet.userCount === 1 ? '' : 's'}
                  </div>
                  <div className="w-2 h-2 bg-gray-600 rounded-full" />
                </div>
              </div>

              <div className="flex flex-col flex-grow px-4 pt-1 pb-4">
                <div className="mb-0.5 text-13 font-medium text-mid break-long-words">
                  {planet.galaxies && planet.galaxies.length > 0
                    ? planet.galaxies.map(galaxy => galaxiesMap[galaxy])[0]
                    : 'Uncategorized'}
                </div>
                <div className="text-xl font-medium text-secondary">
                  {planet.name}
                </div>

                <div className="text-sm text-tertiary line-clamp-2">
                  {planet.description || 'New CometX Planet'}
                </div>

                <div className="flex items-center pt-4 mt-auto space-x-4">
                  <div className="inline-flex items-center justify-center w-full text-sm font-medium transition border rounded hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-800 text-tertiary h-9">
                    Join
                    <FiUserPlus className="w-5 h-5 ml-3" />
                  </div>
                  <NavLink
                    href={`/chat/planet/${planet.name}`}
                    className="inline-flex items-center justify-center w-full text-sm font-medium transition border rounded hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-800 text-tertiary h-9"
                  >
                    Enter
                    <FiExternalLink className="w-5 h-5 ml-3" />
                  </NavLink>
                </div>
              </div>

              {/*{planet.galaxies && planet.galaxies.length > 0 && (
                <div className="pt-24 mt-auto font-medium text-13">
                  {planet.galaxies
                    .map(galaxy => galaxiesMap[galaxy])
                    .join(', ')}
                </div>
              )}*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withLayout(<ChatLayout />)(ChatPage)

/*
export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  /!*await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })*!/

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  })
}
*/
