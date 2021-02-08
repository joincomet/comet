import Logo from '@/components/ui/icons/Logo'
import { SiDiscord, SiGithub, SiPatreon, SiTwitter } from 'react-icons/si'
import { HiDownload } from 'react-icons/hi'
import Tippy from '@tippyjs/react'
import Grass from '@/components/graphics/Grass'
import Telescope from '@/components/graphics/Telescope'
import Meteors from '@/components/graphics/Meteors'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { getOS } from '@/lib/getOS'
import {
  CURRENT_USER_QUERY,
  useCurrentUser
} from '@/lib/queries/useCurrentUser'
import { useQuery } from '@apollo/client'

const container = 'relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto'
const iconButton =
  'p-3 hover:bg-gray-700 transition rounded-full cursor-pointer'
const link = 'hover:underline cursor-pointer flex items-center'

export default function LandingPage() {
  const { ref, inView, entry } = useInView()
  const { data } = useQuery(CURRENT_USER_QUERY)

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 transition ${
          inView ? 'bg-opacity-0' : 'bg-opacity-90'
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-blue-500 to-red-500 w-full" />

        <div className="px-24 h-16 flex items-center">
          <Logo className="h-6 text-gray-200" />

          <div className="inline-flex items-center bg-red-300 text-xs ml-6 px-3 h-6 text-red-700 rounded-full">
            Coming Soon
          </div>

          <div className="ml-auto space-x-3 inline-flex items-center">
            <Tippy content="Support CometX on Patreon">
              <div className={iconButton}>
                <SiPatreon size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX Discord Server">
              <div className={`${iconButton}`}>
                <SiDiscord size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="@cometx_io on Twitter">
              <div className={iconButton}>
                <SiTwitter size={20} className="text-gray-200" />
              </div>
            </Tippy>

            <Tippy content="CometX on GitHub">
              <div className={iconButton}>
                <SiGithub size={20} className="text-gray-200" />
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
        <div
          ref={ref}
          className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900"
        >
          <Grass className="w-1/2" />
          <Grass className="w-1/2" />
        </div>
        <Telescope className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
        <Meteors />

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
                <HiDownload className="w-6 h-6 ml-3" />
              </a>

              <Link
                to={data && data.currentUser ? '/home' : '/login'}
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
