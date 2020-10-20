import { Formik } from 'formik'
import { NavLink } from './NavLink'

export default function SignUpForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="username"
            className="text-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            className="text-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <input
            placeholder="Password"
            type="password"
            name="email"
            className="text-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />

          <div className="flex">
            <div className="inline-flex items-center px-6 py-2 ml-auto transition duration-150 ease-in-out rounded-full cursor-pointer hover:bg-gray-200">
              <span className="mx-auto text-sm font-medium text-tertiary">
                Already have an account?
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
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
      )}
    </Formik>
  )
}
