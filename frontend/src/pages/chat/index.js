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

function ChatPage() {
  const planets = usePlanets({ sort: 'TOP' }).data || []

  return (
    <div>
      <div className="mycontainer">
        <div className="px-24 pt-24 pb-12">
          <div className="relative z-0 w-full">
            <div className="shadow rounded-2xl bg-white dark:bg-gray-800 p-6">
              <div className="header-2 mb-4">
                Explore <span className="text-blue-400">{planets.length}+</span>{' '}
                Planets
              </div>
              <input
                placeholder="Minecraft"
                className="rounded tracking-tight font-semibold w-full h-12 dark:bg-gray-900 px-6 focus:outline-none focus:ring-2 ring-gray-700 transition"
              />
              {/*<div className="flex space-x-4">
                <div className="ml-auto" />
                <div className="h-9 rounded dark:bg-blue-600 text-white font-medium text-sm inline-flex items-center px-4 mt-4">
                  Create Planet
                </div>
                <div className="h-9 rounded dark:bg-blue-600 text-white font-medium text-sm inline-flex items-center px-4 mt-4">
                  Search
                </div>
              </div>*/}
            </div>
            {/*<div
              className="absolute inset-0 transform -rotate-3 bg-gradient-to-br to-red-400 from-blue-500 rounded"
              style={{ zIndex: -1 }}
            />*/}
          </div>
        </div>
      </div>

      <div className="mycontainer-nopad px-24">
        <div className="grid grid-cols-4 gap-12">
          <div className="rounded group shadow dark:bg-gray-900 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
            <div className="flex flex-col items-center justify-center h-full group-hover:text-blue-500 text-tertiary transition">
              <FiPlusCircle className="w-16 h-16" />
              <div className="text-xl font-medium mt-4">Create a Planet</div>
            </div>
          </div>
          {planets.map(planet => (
            <div
              key={planet.id}
              className="rounded group shadow dark:bg-gray-900 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <div className="transition group-hover:shadow-md -top-3 left-4 rounded-full inline-flex items-center justify-center absolute w-32 h-32 dark:bg-gray-800">
                {planet.avatarUrl ? (
                  <img
                    src={planet.avatarUrl}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <div className="header-2 text-mid">{planet.name[0]}</div>
                )}
              </div>

              <div className="text-right pl-32 pr-4 pt-4 h-32 flex flex-col items-end">
                <div className="inline-flex items-center">
                  <div className="mr-3 text-13 font-medium text-green-600">
                    {parseInt(Math.random() * planet.userCount)} online
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                </div>
                <div className="inline-flex items-center">
                  <div className="mr-3 text-13 font-medium text-tertiary">
                    {planet.userCount} member{planet.userCount === 1 ? '' : 's'}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
              </div>

              <div className="pt-1 px-4 pb-4">
                <div className="mb-0.5 text-13 font-medium text-mid break-long-words">
                  {planet.galaxies && planet.galaxies.length > 0
                    ? planet.galaxies.map(galaxy => galaxiesMap[galaxy])[0]
                    : 'Uncategorized'}
                </div>
                <div className="font-medium text-xl text-secondary">
                  {planet.name}
                </div>

                <div className="text-tertiary text-sm">
                  {planet.description || 'New CometX Planet'}
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <div className="transition hover:bg-gray-200 dark:hover:bg-gray-800 inline-flex items-center rounded border dark:border-gray-800 text-sm text-tertiary w-full h-9 justify-center font-medium">
                    Join
                    <FiUserPlus className="ml-3 w-5 h-5" />
                  </div>
                  <div className="transition hover:bg-gray-200 dark:hover:bg-gray-800 inline-flex items-center rounded border dark:border-gray-800 text-sm text-tertiary w-full h-9 justify-center font-medium">
                    Enter
                    <FiExternalLink className="w-5 h-5 ml-3" />
                  </div>
                </div>
              </div>

              {/*{planet.galaxies && planet.galaxies.length > 0 && (
                <div className="pt-24 text-13 font-medium mt-auto">
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

export default withLayout(<Layout />)(ChatPage)

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
