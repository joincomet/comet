import React from 'react'
import NavLink from '@/components/NavLink'

export default function InfoLinks() {
  const link = 'tip text-mid hover:underline cursor-pointer block'
  return (
    <>
      <style jsx>
        {`
          a {
            display: block;
          }
        `}
      </style>

      <div className="py-3">
        <div className="flex divide-x divide-gray-200 dark:divide-gray-800">
          <div className="space-y-1 flex-grow px-3">
            <a
              href="https://discord.gg/NPCMGSm"
              rel="noopener noreferrer"
              target="_blank"
              className={link}
            >
              Discord
            </a>
            <a
              href="https://www.patreon.com/cometx"
              rel="noopener noreferrer"
              target="_blank"
              className={link}
            >
              Patreon
            </a>
            <a
              href="https://github.com/cometx-io"
              rel="noopener noreferrer"
              target="_blank"
              className={link}
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/cometx_io"
              rel="noopener noreferrer"
              target="_blank"
              className={link}
            >
              Twitter
            </a>
          </div>

          <div className="space-y-1 flex-grow px-3">
            <NavLink href="/about" target="_blank" className={link}>
              About Us
            </NavLink>
            <NavLink href="/about/terms" target="_blank" className={link}>
              Terms of Service
            </NavLink>
            <NavLink href="/about/privacy" target="_blank" className={link}>
              Privacy Policy
            </NavLink>
            <NavLink href="/about/content" target="_blank" className={link}>
              Content Policy
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
