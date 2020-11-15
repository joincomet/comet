import NavLink from './NavLink'
import { FiLock } from 'react-icons/fi'
import { SiGoogle, SiGithub, SiTwitter, SiReddit } from 'react-icons/si'
import CometXLogo from '@/components/CometXLogo'

export default function SignUpForm() {
  const textField =
    'w-full h-10 px-4 text-sm text-gray-500 transition duration-150 ease-in-out origin-left bg-white border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 focus:outline-none'

  const oauthButton =
    'px-6 h-10 rounded-md shadow-sm text-white text-sm font-medium inline-flex items-center cursor-pointer transition-150'

  return (
    <form className="flex flex-col space-y-4">
      <CometXLogo className="mb-2 h-5" />

      <div style={{ backgroundColor: '#4285F4' }} className={oauthButton}>
        <SiGoogle size={20} />
        <span className="ml-6">Sign in with Google</span>
      </div>

      <div style={{ backgroundColor: '#1DA1F2' }} className={oauthButton}>
        <SiTwitter size={20} />
        <span className="ml-6">Sign in with Twitter</span>
      </div>

      <div
        className={`${oauthButton} bg-white border dark:border-white border-gray-200`}
      >
        <SiReddit size={20} style={{ color: '#FF4500' }} />
        <span className="ml-6 text-black">Sign in with Reddit</span>
      </div>

      <div style={{ backgroundColor: '#181717' }} className={oauthButton}>
        <SiGithub size={20} />
        <span className="ml-6">Sign in with GitHub</span>
      </div>

      <div className={`${oauthButton} bg-gray-500`}>
        <FiLock size={20} />
        <span className="ml-6">Sign in with Username/Password</span>
      </div>

      {/*<input placeholder="Username" name="username" className={textField} />
      <input
        type="email"
        name="email"
        placeholder="Email (Optional)"
        className={textField}
      />
      <input
        placeholder="Password"
        type="password"
        name="email"
        className={textField}
      />*/}

      {/*<div className="flex">
        <div className="inline-flex items-center px-6 py-2 ml-auto transition duration-150 ease-in-out rounded-full cursor-pointer hover:bg-gray-200">
          <span className="mx-auto text-sm font-medium text-tertiary">
            Already have an account?
          </span>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-2 ml-3 text-white transition duration-300 ease-in-out transform bg-indigo-500 border border-indigo-600 rounded-full cursor-pointer hover:scale-105 hover:bg-white hover:text-indigo-600"
        >
          <span className="mx-auto text-sm font-semibold">Sign Up</span>
        </button>
      </div>

      <div className="text-xs text-tertiary">
        By clicking Sign Up, you agree to our{' '}
        <NavLink
          className="text-indigo-600 hover:underline"
          href="/about/terms"
          target="_blank"
        >
          Terms of Service
        </NavLink>{' '}
        and{' '}
        <NavLink
          className="text-indigo-600 hover:underline"
          href="/about/privacy"
          target="_blank"
        >
          Privacy Policy
        </NavLink>
      </div>*/}
    </form>
  )
}
