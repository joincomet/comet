import { useLoginDialog } from '@/hooks/useLoginDialog'
import { useForm } from 'react-hook-form'
import { useCreateAccountMutation, useLoginMutation } from '@/graphql/hooks'
import {
  IconEmail,
  IconSpinner,
  IconUser,
  IconUserToServerArrow,
  IconX
} from '@/components/ui/icons/Icons'
import { useState } from 'react'
import { VectorLogo } from '@/components/ui/vectors'
import isEmail from 'validator/es/lib/isEmail'
import StyledDialog from '@/components/ui/dialog/StyledDialog'
import ShowPasswordButton from '@/components/ui/ShowPasswordButton'

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
          location.reload()
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
          location.reload()
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
    <StyledDialog
      close={close}
      open={open}
      onSubmit={handleSubmit(onSubmit)}
      buttons={
        <button
          type="submit"
          className={`form-button-submit`}
          disabled={disabled}
        >
          {(isCreateAccount && createAccountLoading) ||
          (!isCreateAccount && loginLoading) ? (
            <IconSpinner className="w-5 h-5" />
          ) : (
            <IconUserToServerArrow className="w-5 h-5" />
          )}
        </button>
      }
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
                    className={`form-input-icon`}
                    placeholder="Username"
                    minLength={3}
                    maxLength={20}
                  />
                  <IconUser className={`form-input-icon-icon`} />
                </div>
                {errors.username?.type === 'minLength' && (
                  <div className={`form-error`}>
                    Username must be between 3 and 20 characters
                  </div>
                )}
                {errors.username?.type === 'pattern' && (
                  <div className={`form-error`}>
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
                    className={`form-input-icon`}
                    placeholder="Email (Optional)"
                    type="email"
                  />
                  <IconEmail className={`form-input-icon-icon`} />
                </div>
                {errors.email?.type === 'email' && (
                  <div className={`form-error`}>{errors.email.message}</div>
                )}
              </div>
            </>
          ) : (
            <input
              id="usernameOrEmail"
              {...register('usernameOrEmail', {
                shouldUnregister: true
              })}
              className={`form-input`}
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
                    className={`form-input-password`}
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
                  <div className={`form-error`}>
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
                          return password === value || 'Passwords do not match'
                        }
                      }
                    })}
                    className={`form-input-password`}
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
                    <div className={`form-error`}>Passwords do not match</div>
                  )}
              </div>
            </>
          ) : (
            <div className="relative">
              <input
                id="password"
                {...register('password', { required: true })}
                className={`form-input`}
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
    </StyledDialog>
  )
}
