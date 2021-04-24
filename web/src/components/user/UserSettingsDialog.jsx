import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import Dialog from '@/components/ui/dialog/Dialog'
import { IconEdit, IconSpinner, IconXLarge } from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import UserAvatar from '@/components/user/UserAvatar'
import ctl from '@netlify/classnames-template-literals'
import {
  useChangeUserAvatarMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
  useUpdateAccountMutation
} from '@/graphql/hooks'
import { useForm } from 'react-hook-form'
import isEmail from 'validator/es/lib/isEmail'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

const inputClass = ctl(`
  w-full
  h-10
  dark:bg-gray-750
  rounded
  focus:outline-none
  transition
  focus:border-blue-400
  px-4
  text-base
  text-primary
  border-none
`)

const labelClass = ctl(`
  text-11
  font-semibold
  tracking-widest
  uppercase
  text-tertiary
  block
  pb-1.5
`)

const errorClass = ctl(`
  text-xs
  text-red-400
  pt-1.5
`)

const deleteBtn = ctl(`
  text-red-500
  border
  rounded
  border-red-500
  px-4
  h-10
  text-sm
  font-medium
  transition
  hover:bg-red-500
  hover:text-gray-100
  focus:outline-none
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:bg-transparent
  disabled:hover:text-red-500
  flex
  items-center
`)

const cancelBtn = ctl(`
  text-tertiary
  px-2
  h-10
  text-sm
  font-medium
  focus:outline-none
`)

export default function UserSettingsDialog({ open, setOpen }) {
  const [user] = useCurrentUser()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  })
  const name = watch('name')
  const email = watch('email')
  const password = watch('password')
  const currentPassword = watch('currentPassword')

  const [
    updateAccount,
    { loading: updateAccountLoading }
  ] = useUpdateAccountMutation()

  const [changeAvatar] = useChangeUserAvatarMutation()
  const [logout] = useLogoutMutation()
  const { push } = useHistory()
  const apolloClient = useApolloClient()

  const close = () => {
    setOpen(false)
    setTimeout(() => reset(), 300)
  }

  const onSubmit = ({ name, email, password, currentPassword }) => {
    updateAccount({
      variables: {
        input: {
          name,
          email,
          password: password ? password : null,
          currentPassword
        }
      }
    }).then(() => {
      toast.success('Saved changes!')
      reset()
    })
  }

  return (
    <>
      <Dialog isOpen={open} close={close}>
        <div
          className="rounded-xl dark:bg-gray-800 scrollbar-custom"
          style={{
            height: `calc(100vh - 2.5rem)`,
            width: `calc(100% - 10rem)`
          }}
        >
          <div className="w-full h-full relative flex">
            <button
              className="absolute top-3 right-3 focus:outline-none rounded-full transition dark:hover:bg-gray-700 p-2"
              onClick={close}
            >
              <IconXLarge className="w-6 h-6 text-tertiary" />
            </button>

            <div className="w-1/3 dark:bg-gray-800 flex justify-end px-4 py-12">
              <div className="w-48">
                <SidebarLabel>User Settings</SidebarLabel>
                <SidebarItem>My Account</SidebarItem>
                <SidebarItem
                  onClick={() => {
                    setOpen(false)
                    push('/')
                    logout().then(() => {
                      apolloClient.resetStore()
                    })
                  }}
                >
                  <span className="text-red-500">Log Out</span>
                </SidebarItem>
              </div>
            </div>
            <div className="w-2/3 px-10 py-16 dark:bg-gray-750">
              <div className="max-w-screen-sm text-left">
                <div className="font-semibold text-primary uppercase mb-6">
                  My Account
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-lg dark:bg-gray-800 p-4"
                >
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      name="avatarFile"
                      id="avatarFile"
                      hidden
                      onChange={e => {
                        const avatarFile = e.target.files[0]
                        if (!avatarFile) return
                        changeAvatar({ variables: { input: { avatarFile } } })
                      }}
                    />
                    <label htmlFor="avatarFile" className="relative group">
                      <UserAvatar user={user} size={20} />
                      <div className="absolute rounded-full cursor-pointer inset-0 bg-black opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 transition flex items-center justify-center">
                        <IconEdit className="w-1/2 h-1/2" />
                      </div>
                    </label>

                    <div className="flex items-end ml-6">
                      <div className="font-semibold text-xl text-primary">
                        {user.name}
                      </div>
                      <div
                        className="text-base text-tertiary"
                        style={{ marginBottom: '1px' }}
                      >
                        #{user.tag}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Name
                      </label>
                      <input
                        className={inputClass}
                        id="name"
                        defaultValue={user.name}
                        {...register('name', {
                          required: true,
                          maxLength: 32,
                          minLength: 2
                        })}
                        maxLength={32}
                        minLength={2}
                        type="text"
                      />
                      {errors.name && (
                        <div className={errorClass}>
                          Name must be 2-32 characters
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email
                      </label>
                      <input
                        className={inputClass}
                        id="email"
                        defaultValue={user.email}
                        {...register('email', {
                          required: true,
                          validate: e => isEmail(e)
                        })}
                        type="email"
                      />
                      {errors.email && (
                        <div className={errorClass}>Invalid email</div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className={labelClass}>
                        New Password
                      </label>
                      <input
                        className={inputClass}
                        id="password"
                        {...register('password', { minLength: 6 })}
                        type="password"
                        minLength={6}
                      />
                      {errors.password && (
                        <div className={errorClass}>
                          Password must be at least 6 characters
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="currentPassword" className={labelClass}>
                        Current Password
                      </label>
                      <input
                        className={inputClass}
                        id="currentPassword"
                        {...register('currentPassword', { required: true })}
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-5">
                    <div className="ml-auto" />
                    <button
                      type="submit"
                      disabled={
                        updateAccountLoading ||
                        !currentPassword ||
                        name?.length < 2 ||
                        name?.length > 32 ||
                        !isEmail(email || '') ||
                        (password && password?.length < 6) ||
                        (!password &&
                          email === user.email &&
                          name === user.name)
                      }
                      className="disabled:opacity-50 disabled:cursor-not-allowed rounded px-4 h-9 text-sm text-primary bg-green-600 focus:outline-none flex items-center"
                    >
                      Save Changes
                      {updateAccountLoading && (
                        <IconSpinner className="w-5 h-5 text-primary ml-3" />
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-10 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setDeleteOpen(true)}
                    className={deleteBtn}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DeleteAccountDialog
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
        />
      </Dialog>
    </>
  )
}

function DeleteAccountDialog({ deleteOpen, setDeleteOpen }) {
  const [password, setPassword] = useState('')
  const [deleteAccount, { loading }] = useDeleteAccountMutation()
  const { push } = useHistory()
  const apolloClient = useApolloClient()

  return (
    <Dialog isOpen={deleteOpen} close={() => setDeleteOpen(false)}>
      <div className="max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4">
        <div className="text-red-400 text-2xl font-semibold">
          Delete Account
        </div>

        <div className="text-secondary pb-5 pt-3 text-base">
          You will not be able to recover your account.
        </div>

        <div className="text-left">
          <label htmlFor="confirmPassword" className={labelClass}>
            Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className={inputClass}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className={cancelBtn}
            type="button"
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </button>
          <button
            className={deleteBtn}
            type="button"
            disabled={!password || loading}
            onClick={() => {
              deleteAccount({ variables: { input: { password } } }).then(() => {
                setDeleteOpen(false)
                push('/')
                apolloClient.resetStore()
              })
            }}
          >
            Delete Account
            {loading && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
