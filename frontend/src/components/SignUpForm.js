import NavLink from './NavLink'
import { FiLock } from 'react-icons/fi'
import {
  SiGoogle,
  SiGithub,
  SiTwitter,
  SiReddit,
  SiDiscord
} from 'react-icons/si'
import CometXLogo from '@/components/CometXLogo'

export default function SignUpForm() {
  const textField =
    'w-full h-10 px-4 text-sm text-gray-500 transition duration-150 ease-in-out origin-left bg-white border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 focus:outline-none'

  const oauthButton =
    'px-6 h-10 w-full rounded-md shadow-sm text-white text-sm font-medium inline-flex items-center cursor-pointer transition-150'

  return (
    <div className="rounded-md shadow-xl z-10 bg-white dark:bg-gray-800 py-6 flex flex-col sm:py-12 px-12">
      <div className="flex">
        <div className="border-r border-gray-200 dark:border-gray-700 pr-6">
          <CometXLogo className="mb-4 w-40" />
          <div className="text-secondary font-medium text-lg mb-6">
            See what's in orbit.
          </div>
          <div className="w-full">
            <div className="text-xs pb-2 uppercase font-medium text-tertiary">
              Username or Email
            </div>
            <input className="bg-gray-200 dark:bg-gray-700 rounded-md h-10 px-6 w-full" />

            <div className="text-xs pb-2 uppercase font-medium text-tertiary mt-6">
              Password
            </div>
            <input className="bg-gray-200 dark:bg-gray-700 rounded-md h-10 px-6 w-full" />

            <div className="text-xs text-blue-500 mt-2">
              Forgot your password?
            </div>

            <div className="rounded-md bg-gradient-to-br to-red-400 from-indigo-500 flex items-center mt-6 text-white h-10">
              <div className="m-auto">Log In</div>
            </div>
          </div>
        </div>

        <div className="my-auto">
          <div className="my-auto space-y-6 flex flex-col items-center h-full pl-6">
            <div style={{ backgroundColor: '#4285F4' }} className={oauthButton}>
              <SiGoogle size={20} />
              <span className="ml-6">Sign in with Google</span>
            </div>

            <div
              className={`${oauthButton} bg-white border dark:border-white border-gray-200`}
            >
              <SiReddit size={20} style={{ color: '#FF4500' }} />
              <span className="ml-6 text-black">Sign in with Reddit</span>
            </div>

            <div style={{ backgroundColor: '#1DA1F2' }} className={oauthButton}>
              <SiTwitter size={20} />
              <span className="ml-6">Sign in with Twitter</span>
            </div>

            <div style={{ backgroundColor: '#7289DA' }} className={oauthButton}>
              <SiDiscord size={20} />
              <span className="ml-6">Sign in with Discord</span>
            </div>

            <div style={{ backgroundColor: '#181717' }} className={oauthButton}>
              <SiGithub size={20} />
              <span className="ml-6">Sign in with GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
