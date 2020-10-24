import { useRouter } from 'next/router'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import {
  FiBell,
  FiGlobe,
  FiHome,
  FiLogIn,
  FiSettings,
  FiStar,
  FiUser
} from 'react-icons/fi'
import { gql, useQuery } from '@apollo/client'
import { NavLink } from './NavLink'
import Logo from '@/components/Logo'

const TOP_PLANETS = gql`
  query TopPlanets {
    planets(sort: TOP, pageSize: 5) {
      id
      name
      profile {
        avatarURL
      }
    }
  }
`

const navitem =
  'relative dark:text-gray-300 origin-left flex flex-row font-medium items-center h-12 px-6 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

function TopPlanets() {
  const { data, loading, error } = useQuery(TOP_PLANETS)

  if (loading || error) return null

  return (
    <div>
      {data.planets.map(planet => (
        <NavLink
          className={navitem}
          key={planet.id}
          href="/+[planet]"
          as={`/+${planet.name}`}
        >
          <img
            src={planet.profile.avatarURL}
            className="w-8 h-8 mr-6 rounded-full bg-gray-200 dark:bg-gray-700"
            alt={planet.name}
          />
          <span className="text-secondary">+{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

function LeftNavDrawer() {
  const router = useRouter()

  return (
    <OverlayScrollbarsComponent>
      <nav
        className="fixed z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 shadow-lg min-h-full h-full hidden sm:block"
        style={{ width: '17.5rem' }}
      >
        <div className="mx-5 pt-3 pb-3 mb-2 border-b border-gray-200 dark:border-gray-700 flex flex-row items-center">
          <NavLink href="/" className="ml-1.5 mr-auto">
            <Logo className="w-32 dark:text-gray-200 text-black" />
          </NavLink>
          <NavLink
            href="/notifications"
            className="ml-4 hover:scale-125 transform duration-150 ease-in-out text-tertiary rounded-full hover:bg-gray-700 transition w-9 h-9 p-2"
          >
            <FiBell className="w-5 h-5" />
          </NavLink>
        </div>
        <div className="text-gray-500">
          <NavLink href="/" className={`${navitem} navitem-active`}>
            <FiHome className="w-5 h-5" />
            <span className="ml-6">Home</span>
          </NavLink>
          <NavLink href="/universe" className={navitem}>
            <FiGlobe className="w-5 h-5" />
            <span className="ml-6">Universe</span>
          </NavLink>
          <NavLink href="/~Test" className={navitem}>
            <FiStar className="w-5 h-5" />
            <span className="ml-6">Galaxies</span>
          </NavLink>
          <NavLink href="/login" className={navitem}>
            <FiLogIn className="w-5 h-5 text-blue-500" />
            <span className="ml-6 text-blue-500">Log In</span>
          </NavLink>
        </div>

        <NavLink
          href={router.pathname}
          as="/login"
          className="m-4 shadow-md px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-full text-white text-sm flex flex-row items-center cursor-pointer hover:scale-105 transform duration-150 ease-in-out"
        >
          <div className="mx-auto inline-flex flex-row items-center">
            <FiUser className="w-6 h-6 mr-4" />
            <span className="font-medium">Sign Up</span>
          </div>
        </NavLink>

        <div className="px-5 mt-9 mb-3 flex flex-row items-center">
          <div className="text-xs text-tertiary font-mono font-base">
            Top Planets
          </div>
          <div className="text-blue-500 font-mono font-base ml-auto rounded-full border border-gray-200 dark:border-gray-700 text-xs py-1 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition ease-in-out duration-100 inline-flex items-center">
            Explore
          </div>
        </div>

        <TopPlanets />
      </nav>
    </OverlayScrollbarsComponent>
  )
}

export default LeftNavDrawer
