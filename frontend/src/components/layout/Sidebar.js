import { FiSearch } from 'react-icons/fi'
import { CgInfinity } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import NavLink from '../NavLink'
import Logo from '@/components/Logo'
import { usePlanets } from '@/lib/queries/usePlanets'
import React, { useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'
import CreatePlanetButton from '@/components/planet/create/CreatePlanetButton'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-800 hover:bg-gray-200 px-6 h-10 flex items-center transition'

function Sidebar() {
  const currentUser = useCurrentUser().data

  const { sidebar, setSidebar } = useHeaderStore()

  const { query, pathname } = useRouter()

  return (
    <>
      <AnimatePresence>
        {sidebar && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 0.75
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            onClick={() => setSidebar(false)}
            className={`z-20 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900`}
          />
        )}
      </AnimatePresence>
      <nav
        className={`w-64 top-0 bottom-0 left-0 fixed z-50 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 transform duration-300 transition ${
          sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Scrollbar
          thumbYProps={{
            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
          }}
        >
          <NavLink href="/" className="flex items-center h-14 px-4">
            <Logo className="h-4 dark:text-gray-200 text-black" />
            <div className="ml-3 mt-2 label text-tertiary">alpha</div>
          </NavLink>
          <div>
            <NavLink
              href="/"
              className={`${link} ${
                pathname === '/'
                  ? 'text-accent navitem-active'
                  : 'text-tertiary'
              }`}
            >
              <BiHomeAlt className="w-5 h-5" />
              <span className="ml-6">Home</span>
            </NavLink>
            <NavLink
              href="/universe"
              className={`${link} ${
                pathname === '/universe'
                  ? 'text-accent navitem-active'
                  : 'text-tertiary'
              }`}
            >
              <CgInfinity className="w-5 h-5" />
              <span className="ml-6">Universe</span>
            </NavLink>
            {/*<NavLink
              href="/explore"
              className={`${link} ${
                pathname === '/explore'
                  ? 'text-accent navitem-active'
                  : 'text-tertiary'
              }`}
            >
              <svg viewBox="0 0 640 512" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M638.7773,216.83088,553.06276,9.88222A15.99571,15.99571,0,0,0,532.16,1.22208L414.84419,49.81961a15.9993,15.9993,0,0,0-8.65758,20.90424l3.22047,7.77537L74.29836,241.74292c-8.31776,4.06444-12.27646,13.25582-9.056,21.02924l8.74351,21.10932L9.88112,310.43609a16.00022,16.00022,0,0,0-8.65954,20.90424l20.0552,48.42175a16.00118,16.00118,0,0,0,20.90475,8.66013l64.10476-26.55462,8.74352,21.10737c3.18531,7.69138,12.42684,11.50387,21.2719,8.46677l126.87565-43.77918c.2285.29492.47848.57031.71088.86133L216.419,490.93951A16.00126,16.00126,0,0,0,231.5976,512h16.86207a15.99882,15.99882,0,0,0,15.17664-10.94138l42.163-126.49575a71.11486,71.11486,0,0,0,28.44718,0l42.163,126.49575A16.00127,16.00127,0,0,0,391.58805,512h16.86011a16.00043,16.00043,0,0,0,15.1786-21.06049L376.15752,348.52388a71.27587,71.27587,0,0,0,15.86018-44.52332c0-.26367-.07616-.50586-.07812-.76757l96.72547-33.37491,3.2361,7.81443a16.00164,16.00164,0,0,0,20.90279,8.66013l117.31578-48.59752A15.99767,15.99767,0,0,0,638.7773,216.83088ZM320.02288,328.0005a23.99994,23.99994,0,1,1,23.99827-23.99994A24.0354,24.0354,0,0,1,320.02288,328.0005Zm55.123-69.74786a71.55078,71.55078,0,0,0-126.92056,43.79285L147.81065,336.69383l-26.6641-64.38068L427.8081,122.92683,470.264,225.43046ZM524.00235,229.739l-61.228-147.81991,58.18918-24.1054,61.22607,147.82186Z"
                />
              </svg>
              <span className="ml-6">Explore Planets</span>
            </NavLink>*/}

            <CreatePlanetButton className={`${link} text-tertiary`} />
          </div>

          <Planets />
        </Scrollbar>
      </nav>
    </>
  )
}

const planetClass =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-800 hover:bg-gray-200 px-6 h-8 flex items-center transition'

function Planets() {
  const [searchPlanets, setSearchPlanets] = useState('')

  const { query, pathname } = useRouter()

  const currentUser = useCurrentUser().data

  const joinedPlanets =
    usePlanets({
      sort: 'AZ',
      joinedOnly: true
    }).data || []

  const topPlanets =
    usePlanets({
      sort: 'TOP',
      joinedOnly: false
    }).data || []

  const fuse = new Fuse(topPlanets, {
    threshold: 0.3,
    keys: ['name']
  })

  const [results, setResults] = useState([])

  useEffect(() => setResults(fuse.search(searchPlanets).slice(0, 5)), [
    searchPlanets
  ])

  function Planet({ planet }) {
    return (
      <NavLink
        className={`${planetClass} ${
          pathname === '/planet/[planetname]' &&
          query.planetname === planet.name
            ? 'text-accent navitem-active'
            : 'text-tertiary'
        }`}
        key={planet.id}
        href={`/planet/${planet.name}`}
      >
        <PlanetAvatar className="w-5 h-5" planet={planet} />

        <span className="ml-3">{planet.name}</span>
      </NavLink>
    )
  }

  const MemoizedPlanet = React.memo(Planet)

  return (
    <div className="py-3 h-full">
      <div className="mx-5 px-3 border-b dark:border-gray-700 relative mb-3">
        <div className="h-8 absolute left-0 top-0 bottom-0 inline-flex items-center ml-1.5">
          <FiSearch size={16} className="text-disabled" />
        </div>

        <input
          type="text"
          placeholder="Search planets"
          className="w-full h-8 text-xs bg-transparent border-none font-medium focus:ring-0 pl-6 pr-3"
          value={searchPlanets}
          onChange={e => setSearchPlanets(e.target.value)}
        />
      </div>

      {searchPlanets &&
        results
          .map(r => r.item)
          .map((planet, index) => (
            <MemoizedPlanet key={index} planet={planet} />
          ))}

      {currentUser &&
        !searchPlanets &&
        joinedPlanets &&
        joinedPlanets.length > 0 && (
          <>
            <div className="label text-tertiary px-6 py-3">My Planets</div>
            {joinedPlanets.map((planet, index) => (
              <MemoizedPlanet key={index} planet={planet} />
            ))}
          </>
        )}

      {!searchPlanets && (
        <>
          <div className="label text-tertiary px-6 py-3">All Planets</div>
          {topPlanets.map((planet, index) => (
            <MemoizedPlanet key={index} planet={planet} />
          ))}
        </>
      )}
    </div>
  )
}

export default Sidebar
