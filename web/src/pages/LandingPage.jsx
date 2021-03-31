import {
  IconDownload,
  IconDiscord,
  IconGithub,
  IconPatreon,
  IconTwitter,
  GraphicLogo,
  GraphicGrass,
  GraphicTelescopeMan,
  GraphicMeteors
} from '@/lib/Icons'
import Tippy from '@tippyjs/react'

import { Link } from 'react-router-dom'
import { getOS } from '@/lib/getOS'
import { useUser } from '@/components/providers/DataProvider'

const container = 'relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto'
const iconButton =
  'p-3 hover:bg-gray-700 transition rounded-full cursor-pointer'

export default function LandingPage() {
  const currentUser = useUser()

  return (
    <div className="relative flex flex-col items-center">
      <div className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 transition`}>
        <div className="h-1 bg-gradient-to-r from-blue-500 to-red-500 w-full" />

        <div className="px-24 h-16 flex items-center">
          <GraphicLogo className="h-6 text-gray-200" />

          <div className="inline-flex items-center bg-red-300 text-xs ml-6 px-3 h-6 text-red-700 rounded-full">
            Coming Soon
          </div>

          <div className="ml-auto space-x-3 inline-flex items-center">
            <Tippy content="Support CometX on Patreon">
              <div className={iconButton}>
                <IconPatreon size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX Discord Server">
              <div className={`${iconButton}`}>
                <IconDiscord size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="@cometx_io on Twitter">
              <div className={iconButton}>
                <IconTwitter size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX on GitHub">
              <div className={iconButton}>
                <IconGithub size={20} className="text-gray-200" />
              </div>
            </Tippy>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top , #18181B 0%,  #27272A 95%)'
        }}
        className="overflow-hidden py-64 w-full relative"
      >
        <div className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900">
          <GraphicGrass className="w-1/2" />
          <GraphicGrass className="w-1/2" />
        </div>
        <GraphicTelescopeMan className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
        <GraphicMeteors />

        <div className={container}>
          <div className="text-center flex flex-col items-center space-y-12">
            {/*<Logo className="h-16 text-gray-200" />*/}

            <h1 className="inline-flex items-center">
              <div className="text-5xl text-white font-semibold tracking-tight">
                All-in-one chat and forums for communities.
              </div>
            </h1>
            <p className="text-white text-xl max-w-screen-md">
              The age of fragmented communities is over. Say goodbye to Reddit
              and Discord, and run your entire community on Comet.
            </p>
            <div className="inline-flex items-center space-x-6">
              <a
                to="https://www.getcomet.net"
                rel="noopener"
                className="bg-blue-500 select-none h-12 px-6 rounded-full inline-flex items-center text-lg text-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Download for {getOS()}
                <IconDownload className="w-6 h-6 ml-3" />
              </a>

              <Link
                to={currentUser ? '/posts' : '/login'}
                className="border border-gray-700 select-none h-12 px-6 rounded-full inline-flex items-center text-lg text-white transition transform shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                Open in Browser
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
