import Tippy from '@tippyjs/react'
import { SiDiscord, SiGithub, SiPatreon, SiTwitter } from 'react-icons/si'
import React from 'react'

export default function CometXLinks() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 bg-gray-100 bg-gray-800 transition dark:hover:bg-gray-700 hover:bg-gray-200 transform ease-in-out duration-200 hover:scale-125'

  return (
    <div className="flex items-center justify-between px-1 pb-3 mx-5 mt-3 border-b dark:border-gray-700">
      <Tippy content="CometX Discord server">
        <a
          href="https://discord.gg/NPCMGSm"
          target="_blank"
          rel="noopener noreferrer"
          className={`${link} relative`}
        >
          <div
            className="absolute inset-center w-3 h-3"
            style={{ backgroundColor: '#F5F5F5' }}
          />
          <SiDiscord
            className="w-5 h-5 mx-auto z-10"
            style={{ color: '#7289DA' }}
          />
        </a>
      </Tippy>

      <Tippy content="CometX on Patreon">
        <a
          href="https://www.patreon.com/cometx"
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          <SiPatreon className="w-5 h-5 mx-auto" style={{ color: '#F96854' }} />
        </a>
      </Tippy>

      <Tippy content="@CometX">
        <a
          href="https://twitter.com/CometX_io"
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          <SiTwitter className="w-5 h-5 mx-auto" style={{ color: '#1DA1F2' }} />
        </a>
      </Tippy>

      <Tippy content="CometX on GitHub">
        <a
          href="https://github.com/comet-app/cometx"
          target="_blank noreferrer"
          rel="noopener"
          className={link}
        >
          <SiGithub className="w-5 h-5 mx-auto text-black dark:text-white" />
        </a>
      </Tippy>
    </div>
  )
}
