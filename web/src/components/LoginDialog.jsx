import Dialog from '@/components/ui/dialog/Dialog'
import { useLoginDialog } from '@/hooks/useLoginDialog'
import { useForm } from 'react-hook-form'
import {
  CurrentUserDocument,
  useCreateAccountMutation,
  useLoginMutation
} from '@/graphql/hooks'
import {
  IconEmail,
  IconHide,
  IconShow,
  IconSpinner,
  IconUser,
  IconUserToServerArrow,
  IconX
} from '@/components/ui/icons/Icons'
import { useEffect, useState } from 'react'
import { VectorLogo } from '@/components/ui/vectors'
import ctl from '@netlify/classnames-template-literals'
import Tippy from '@tippyjs/react'
import isEmail from 'validator/es/lib/isEmail'
import { gracefullyRestart } from '@/graphql/WebSocketLink'
import { useApolloClient } from '@apollo/client'

const inputClass = ctl(`
  border-0
  border-b
  focus:ring-0
  dark:border-gray-700
  bg-transparent
  w-full
  h-10
  text-sm
  px-1.5
  focus:outline-none
  transition
  dark:focus:border-blue-500
  text-primary
`)

const iconClass = ctl(`
  absolute
  left-1.5
  top-1/2
  transform
  -translate-y-1/2
  w-5
  h-5
  text-tertiary
`)

const errorClass = ctl(`
  text-red-400
  text-xs
  pt-2.5
  pl-1.5
`)

const buttonClass = ctl(`
  disabled:opacity-50
  focus:outline-none
  shadow
  rounded
  bg-green-600
  w-20
  h-9
  flex
  items-center
  justify-center
  disabled:cursor-not-allowed
`)

const showPasswordClass = ctl(`
  highlightable
  absolute
  right-1.5
  top-1/2
  transform
  -translate-y-1/2
`)

const usernameRegex = /^[A-Za-z0-9-_]+$/gi

export default function LoginDialog() {
  const [open, setOpen, isCreateAccount, setCreateAccount] = useLoginDialog()
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    shouldUnregister: true
  })
  const email = watch('email')
  const username = watch('username')
  const usernameOrEmail = watch('usernameOrEmail')
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const [createAccount, { loading: createAccountLoading }] =
    useCreateAccountMutation()
  const [login, { loading: loginLoading }] = useLoginMutation()
  const apolloClient = useApolloClient()
  const onSubmit = ({ usernameOrEmail, email, username, password }) => {
    if (isCreateAccount) {
      createAccount({
        variables: {
          input: {
            username,
            password,
            email: email ? email : null
          }
        }
      }).then(
        ({
          data: {
            createAccount: { accessToken, user }
          }
        }) => {
          localStorage.setItem('token', accessToken)
          apolloClient.resetStore()
          apolloClient.cache.writeQuery({
            query: CurrentUserDocument,
            data: user
          })
          gracefullyRestart()
          setOpen(false)
          setCreateAccount(false)
        }
      )
    } else {
      const input = isEmail(usernameOrEmail)
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
      login({ variables: { input: { ...input, password } } }).then(
        ({
          data: {
            login: { accessToken, user }
          }
        }) => {
          localStorage.setItem('token', accessToken)
          apolloClient.resetStore()
          apolloClient.cache.writeQuery({
            query: CurrentUserDocument,
            data: user
          })
          gracefullyRestart()
          setOpen(false)
          setCreateAccount(false)
        }
      )
    }
  }
  const close = () => {
    reset()
    setOpen(false)
  }
  const disabled = !(isCreateAccount
    ? !!username &&
      username.length >= 3 &&
      username.length <= 20 &&
      usernameRegex.test(username) &&
      (!email || (!!email && isEmail(email))) &&
      !!password &&
      password.length >= 6 &&
      !!confirmPassword &&
      confirmPassword === password
    : !!usernameOrEmail && !!password)
  return (
    <Dialog close={close} isOpen={open}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg dark:bg-gray-800 max-w-lg w-full relative"
      >
        <div className="rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2" />
        <div className="px-5 pt-2 pb-9 text-left">
          <div className="pb-4 flex items-center">
            <div
              onClick={() => {
                if (isCreateAccount) {
                  setCreateAccount(false)
                  reset()
                }
              }}
              className={`text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 ${
                isCreateAccount
                  ? 'border-transparent text-secondary'
                  : 'dark:border-gray-300 text-primary'
              }`}
            >
              Log In
            </div>

            <div
              onClick={() => {
                if (!isCreateAccount) {
                  setCreateAccount(true)
                  reset()
                }
              }}
              className={`text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 ${
                isCreateAccount
                  ? 'dark:border-gray-300 text-primary'
                  : 'border-transparent text-secondary'
              }`}
            >
              Create Account
            </div>

            <div className="ml-auto">
              <VectorLogo className="h-3.5 text-secondary" />
            </div>
            <IconX
              className="ml-5 w-5 h-5 text-tertiary highlightable"
              onClick={() => close()}
            />
          </div>

          <div className="space-y-4">
            {isCreateAccount ? (
              <>
                <div>
                  <div className="relative">
                    <input
                      id="username"
                      {...register('username', {
                        required: true,
                        pattern: usernameRegex,
                        maxLength: 20,
                        minLength: 3
                      })}
                      className={`${inputClass} pl-9`}
                      placeholder="Username"
                      minLength={3}
                      maxLength={20}
                    />
                    <IconUser className={iconClass} />
                  </div>
                  {errors.username?.type === 'minLength' && (
                    <div className={errorClass}>
                      Username must be between 3 and 20 characters
                    </div>
                  )}
                  {errors.username?.type === 'pattern' && (
                    <div className={errorClass}>
                      Letters, numbers, dashes, and underscores only
                    </div>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      id="email"
                      {...register('email', {
                        validate: {
                          email: value =>
                            !value || isEmail(value) || 'Invalid email'
                        }
                      })}
                      className={`${inputClass} pl-9`}
                      placeholder="Email (Optional)"
                      type="email"
                    />
                    <IconEmail className={iconClass} />
                  </div>
                  {errors.email?.type === 'email' && (
                    <div className={errorClass}>{errors.email.message}</div>
                  )}
                </div>
              </>
            ) : (
              <input
                id="usernameOrEmail"
                {...register('usernameOrEmail', {
                  required: true,
                  shouldUnregister: true
                })}
                className={inputClass}
                placeholder="Username or email"
              />
            )}

            {isCreateAccount ? (
              <>
                <div>
                  <div className="relative">
                    <input
                      id="password"
                      {...register('password', {
                        required: true,
                        minLength: 6
                      })}
                      className={inputClass}
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      minLength={6}
                    />
                    <ShowPasswordButton
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  {errors.password?.type === 'minLength' && (
                    <div className={errorClass}>
                      Password must be at least 6 characters
                    </div>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      {...register('confirmPassword', {
                        required: true,
                        validate: {
                          matchesPreviousPassword: value => {
                            const { password } = getValues()
                            return (
                              password === value || 'Passwords do not match'
                            )
                          }
                        }
                      })}
                      className={inputClass}
                      placeholder="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                    />
                    <ShowPasswordButton
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                  {!!password &&
                    !!confirmPassword &&
                    password !== confirmPassword && (
                      <div className={errorClass}>Passwords do not match</div>
                    )}
                </div>
              </>
            ) : (
              <div className="relative">
                <input
                  id="password"
                  {...register('password', { required: true })}
                  className={inputClass}
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                <ShowPasswordButton
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            )}
          </div>
        </div>
        <div className="dark:bg-gray-800 rounded absolute right-5 bottom-9 transform translate-y-1/2">
          <button type="submit" className={buttonClass} disabled={disabled}>
            {(isCreateAccount && createAccountLoading) ||
            (!isCreateAccount && loginLoading) ? (
              <IconSpinner className="w-5 h-5 text-primary" />
            ) : (
              <IconUserToServerArrow className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        <div className="rounded-b-lg dark:bg-gray-750 h-9" />
      </form>
    </Dialog>
  )
}

function ShowPasswordButton({ showPassword, setShowPassword }) {
  return (
    <Tippy content={showPassword ? 'Hide Password' : 'Show Password'}>
      <div className={showPasswordClass}>
        {showPassword ? (
          <IconHide
            onClick={() => setShowPassword(false)}
            className="w-5 h-5"
          />
        ) : (
          <IconShow onClick={() => setShowPassword(true)} className="w-5 h-5" />
        )}
      </div>
    </Tippy>
  )
}
