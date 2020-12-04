import {
  SiGoogle,
  SiGithub,
  SiTwitter,
  SiReddit,
  SiDiscord
} from 'react-icons/si'
import { useForm } from 'react-hook-form'
import Logo from '@/components/Logo'
import { useLoginMutation } from '@/lib/useLoginMutation'
import { useRouter } from 'next/router'

const oauthButton =
  'px-6 h-9 w-full rounded-md shadow-sm text-white text-sm font-medium inline-flex items-center cursor-pointer transition'

const textBox =
  'bg-gray-200 dark:bg-gray-700 rounded-md h-9 px-3 w-full border-none transition text-sm'

export default function SignUpForm({ className }) {
  const { register, handleSubmit, watch, errors } = useForm()

  const router = useRouter()

  const loginMutation = useLoginMutation()

  const onSubmit = async ({ username, password }) => {
    const { accessToken, user } = await loginMutation.mutateAsync({
      username,
      password
    })
    await router.push('/')
  }

  return (
    <>
      <div
        className={`absolute rounded-md transform -rotate-6 shadow-md inset-0 bg-gradient-to-br to-red-400 from-blue-500 ${
          className || ''
        }`}
      />

      <div
        className={`relative rounded-md shadow-xl bg-white dark:bg-gray-800 py-6 flex flex-col sm:py-12 px-12`}
      >
        <div className="flex">
          <div className="border-r border-gray-200 dark:border-gray-700 pr-6">
            <Logo className="mb-4 w-40" />
            <div className="text-secondary font-medium text-lg mb-6">
              See what's in orbit.
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <label>
                <div className="text-xs pb-2 uppercase font-medium text-tertiary">
                  Username
                </div>
                <input
                  name="username"
                  type="text"
                  className={textBox}
                  ref={register({ required: true })}
                />
              </label>

              <label>
                <div className="text-xs pb-2 uppercase font-medium text-tertiary mt-6">
                  Password
                </div>
                <input
                  name="password"
                  type="password"
                  className={textBox}
                  ref={register({ required: true })}
                />
              </label>

              <div className="text-xs text-blue-500 mt-2">
                Forgot your password?
              </div>

              <button
                type="submit"
                className="w-full focus:outline-none rounded-md bg-gradient-to-br to-red-400 from-blue-500 flex items-center mt-6 text-white h-9 text-sm"
              >
                <div className="m-auto">Log In</div>
              </button>

              <button
                type="submit"
                className="w-full focus:outline-none rounded-md border border-gray-200 dark:border-gray-700 transition bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white flex items-center mt-3 h-9 text-sm"
              >
                <div className="m-auto">Create Account</div>
              </button>
            </form>
          </div>

          <div className="my-auto space-y-6 flex flex-col items-center h-full pl-6">
            <div
              style={{ backgroundColor: '#4285F4' }}
              className={oauthButton}
              onClick={() => signIn('google')}
            >
              <SiGoogle size={20} />
              <span className="ml-6">Sign in with Google</span>
            </div>

            {/*<div
            onClick={() => signIn('reddit')}
            className={`${oauthButton} bg-white border dark:border-white border-gray-200`}
          >
            <SiReddit size={20} style={{ color: '#FF4500' }} />
            <span className="ml-6 text-black">Sign in with Reddit</span>
          </div>*/}

            <div
              style={{ backgroundColor: '#1DA1F2' }}
              className={oauthButton}
              onClick={() => signIn('twitter')}
            >
              <SiTwitter size={20} />
              <span className="ml-6">Sign in with Twitter</span>
            </div>

            <div
              style={{ backgroundColor: '#7289DA' }}
              className={oauthButton}
              onClick={() => signIn('discord')}
            >
              <SiDiscord size={20} />
              <span className="ml-6">Sign in with Discord</span>
            </div>

            <div
              style={{ backgroundColor: '#181717' }}
              className={oauthButton}
              onClick={() => signIn('github')}
            >
              <SiGithub size={20} />
              <span className="ml-6">Sign in with GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
