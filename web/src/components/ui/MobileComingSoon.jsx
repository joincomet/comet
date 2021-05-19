import { Meteors } from '@/components/ui/meteors'
import { VectorLogo } from '@/components/ui/vectors'
import { Link } from 'react-router-dom'
import {
  IconDiscord,
  IconGithub,
  IconTwitter
} from '@/components/ui/icons/Icons'

export default function MobileComingSoon() {
  return (
    <div className="relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center md:hidden p-6 text-center">
      <Meteors />
      <div className="z-10 flex flex-col items-center">
        <VectorLogo className="w-48" />
        <img
          alt="astronaut"
          src="/astronaut.png"
          className="object-contain opacity-75 h-48 animate-float mt-5"
        />
        <div className="pt-5 font-medium text-primary text-lg">
          Support for mobile devices is coming soon!
        </div>
        <div className="text-tertiary text-base pt-2 font-medium">
          Please visit{' '}
          <Link to="/" className="text-accent hover:underline">
            joincomet.app
          </Link>{' '}
          from a laptop or desktop computer.
        </div>

        <div className="text-tertiary text-base pt-5 font-medium">
          Stay updated:
        </div>

        <div className="space-y-4 text-tertiary text-sm font-medium pt-5">
          <a
            href="https://discord.gg/NPCMGSm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <IconDiscord className="h-6 w-6 mr-4 text-tertiary" />
            Discord
          </a>
          <a
            href="https://github.com/joincomet/comet"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <IconGithub className="h-6 w-6 mr-4 text-tertiary" />
            GitHub
          </a>
          <a
            href="https://twitter.com/joincometapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <IconTwitter className="h-6 w-6 mr-4 text-tertiary" />
            Twitter
          </a>
        </div>
      </div>
    </div>
  )
}
