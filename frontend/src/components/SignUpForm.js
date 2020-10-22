import { NavLink } from './NavLink'

export default function SignUpForm() {
  const textField =
    ' w-full h-10 px-4 text-sm text-gray-500 transition duration-150 ease-in-out origin-left bg-white border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 focus:outline-none'

  return (
    <form className="flex flex-col space-y-6">
      <input placeholder="Username" name="username" className={textField} />
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
      />

      <div className="flex">
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
      </div>
    </form>
  )
}
