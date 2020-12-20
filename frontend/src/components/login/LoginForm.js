import { useForm } from 'react-hook-form'
import Logo from '@/components/Logo'
import { useRouter } from 'next/router'
import {
  useLoginMutation,
  useSignUpMutation
} from '@/lib/mutations/authMutations'
import { useQueryClient } from 'react-query'

const textBox =
  'bg-gray-200 dark:bg-gray-700 rounded-md h-9 px-3 w-full border-none transition text-sm'

export default function LoginForm({ onFinish }) {
  const { register, handleSubmit, watch, errors, formState } = useForm({
    mode: 'onChange'
  })
  const queryClient = useQueryClient()

  const loginMutation = useLoginMutation()
  const signUpMutation = useSignUpMutation()

  const login = handleSubmit(async ({ username, password }) => {
    const { accessToken, user } = await loginMutation.mutateAsync({
      username,
      password
    })
    await queryClient.invalidateQueries()
    if (onFinish) onFinish()
  })

  const signup = handleSubmit(async ({ username, password }) => {
    const { accessToken, user } = await signUpMutation.mutateAsync({
      username,
      password
    })
    await queryClient.invalidateQueries()
    if (onFinish) onFinish()
  })

  return (
    <form
      onSubmit={login}
      className={`shadow-xl bg-white dark:bg-gray-900 rounded-2xl py-6 sm:py-12 px-12`}
    >
      <Logo className="mb-4 w-40" />
      <div className="text-secondary font-medium text-lg mb-6">
        See what's in orbit.
      </div>

      <label>
        <div className="pb-2 label text-tertiary">Username</div>
        <input
          name="username"
          type="text"
          className={textBox}
          ref={register({ required: true })}
        />
      </label>

      <label>
        <div className="pb-2 label text-tertiary mt-6">Password</div>
        <input
          name="password"
          type="password"
          className={textBox}
          ref={register({ required: true })}
        />
      </label>

      <div className="tip text-blue-500 mt-2">Forgot your password?</div>

      <button
        type="submit"
        onClick={() => login()}
        name="login"
        disabled={!formState.isValid || loginMutation.isLoading}
        className={`w-full focus:outline-none rounded-md bg-gradient-to-br to-red-400 from-blue-500 flex items-center justify-center mt-6 h-9 label disabled:opacity-50 transition`}
      >
        Log In
      </button>

      <button
        type="submit"
        onClick={() => signup()}
        name="signup"
        className="w-full focus:outline-none rounded-md border border-gray-200 dark:border-gray-700 transition bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white flex items-center mt-3 h-9 label"
      >
        <div className="m-auto">Create Account</div>
      </button>
    </form>
  )
}
