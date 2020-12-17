import {
  SiGoogle,
  SiGithub,
  SiTwitter,
  SiReddit,
  SiDiscord
} from 'react-icons/si'
import { useForm } from 'react-hook-form'
import Logo from '@/components/Logo'
import { useLoginMutation } from '@/lib/mutations/useLoginMutation'
import { useRouter } from 'next/router'

const oauthButton =
  'px-6 h-9 w-full rounded-md shadow-sm text-white text-sm font-medium inline-flex items-center cursor-pointer transition'

const textBox =
  'bg-gray-200 dark:bg-gray-700 rounded-md h-9 px-3 w-full border-none transition text-sm'

export default function LoginForm({ onFinish }) {
  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: 'onChange'
  })

  const router = useRouter()

  const loginMutation = useLoginMutation()

  const onSubmit = async ({ username, password }) => {
    const { accessToken, user } = await loginMutation.mutateAsync({
      username,
      password
    })
    if (onFinish) onFinish()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`shadow-xl card py-6 sm:py-12 px-12`}
    >
      <Logo className="mb-4 w-40" />
      <div className="text-secondary font-medium text-lg mb-6">
        See what's in orbit.
      </div>

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

      <div className="text-xs text-blue-500 mt-2">Forgot your password?</div>

      <button
        type="submit"
        disabled={!formState.isValid || loginMutation.isLoading}
        className={`w-full focus:outline-none rounded-md bg-gradient-to-br to-red-400 from-blue-500 flex items-center justify-center mt-6 text-white h-9 text-sm disabled:opacity-50 transition`}
      >
        Log In
      </button>

      <button
        type="submit"
        className="w-full focus:outline-none rounded-md border border-gray-200 dark:border-gray-700 transition bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white flex items-center mt-3 h-9 text-sm"
      >
        <div className="m-auto">Create Account</div>
      </button>
    </form>
  )
}
