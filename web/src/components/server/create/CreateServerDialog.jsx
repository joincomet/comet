import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Dialog from '@/components/ui/dialog/Dialog'
import {
  IconCheck,
  IconDelete,
  IconEdit,
  IconSpinner,
  IconUserToServerArrow
} from '@/components/ui/icons/Icons'
import { readURL } from '@/utils/readURL'
import {
  CurrentUserDocument,
  ServerCategory,
  useCreateServerMutation,
  useDeleteServerMutation,
  useUpdateServerMutation
} from '@/graphql/hooks'
import CategorySelect from '@/components/server/CategorySelect'
import ctl from '@netlify/classnames-template-literals'
import Tippy from '@tippyjs/react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

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

const deleteButtonClass = ctl(`
  disabled:opacity-50
  focus:outline-none
  shadow
  rounded
  bg-red-500
  w-20
  h-9
  flex
  items-center
  justify-center
  disabled:cursor-not-allowed
`)

export default function CreateServerDialog({ open, setOpen, server }) {
  const [currentUser] = useCurrentUser()
  const [createServer, { loading: createLoading }] = useCreateServerMutation({
    update(cache, { data: { createServer } }) {
      const data = cache.readQuery({ query: CurrentUserDocument })
      cache.writeQuery({
        query: CurrentUserDocument,
        data: {
          user: { ...data.user, servers: [createServer, ...data.user.servers] }
        }
      })
    }
  })
  const [updateServer, { loading: updateLoading }] = useUpdateServerMutation()
  const [category, setCategory] = useState(
    server?.category ?? ServerCategory.Other
  )
  const { handleSubmit, register, watch, reset, setValue } = useForm({
    shouldUnregister: true,
    defaultValues: server ? { displayName: server.displayName } : {}
  })
  const avatarFile = watch('avatarFile')
  const bannerFile = watch('bannerFile')
  const name = watch('name')
  const displayName = watch('displayName')
  const [nameChanged, setNameChanged] = useState(false)
  useEffect(() => {
    if (!nameChanged && displayName != null) {
      setValue(
        'name',
        displayName.replace(' ', '_').replace(/[^A-Za-z0-9_]/i, '')
      )
    }
  }, [displayName])

  useEffect(() => {
    if (!name) setNameChanged(false)
  }, [name])

  const [avatarSrc, setAvatarSrc] = useState(server?.avatarUrl)
  const [bannerSrc, setBannerSrc] = useState(server?.bannerUrl)

  useEffect(() => {
    if (!server) {
      setAvatarSrc(null)
      setBannerSrc(null)
      reset()
      setCategory(ServerCategory.Other)
    } else {
      setAvatarSrc(server.avatarUrl)
      setBannerSrc(server.bannerUrl)
      reset()
      setValue('displayName', server.displayName)
      setCategory(server.category)
    }
  }, [server])

  useEffect(() => {
    if (!avatarFile || !avatarFile[0]) return
    readURL(avatarFile[0]).then(url => setAvatarSrc(url))
  }, [avatarFile])

  useEffect(() => {
    if (!bannerFile || !bannerFile[0]) return
    readURL(bannerFile[0]).then(url => setBannerSrc(url))
  }, [bannerFile])

  const { push } = useHistory()

  const onSubmit = ({ name, displayName, avatarFile, bannerFile }) => {
    if (!server) {
      createServer({
        variables: {
          input: {
            name,
            displayName,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null
          }
        }
      }).then(({ data: { createServer } }) => {
        setOpen(false)
        push(`/+${createServer.name}`)
      })
    } else {
      updateServer({
        variables: {
          input: {
            serverId: server.id,
            displayName,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null
          }
        }
      }).then(res => {
        console.log(res)
        setOpen(false)
      })
    }
  }

  const initials = (displayName || '')
    .split(' ')
    .map(s => s[0])
    .join('')
    .toUpperCase()

  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <Dialog isOpen={open} close={() => setOpen(false)} closeOnOverlayClick>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg dark:bg-gray-800 max-w-lg w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <input
          type="file"
          {...register('bannerFile')}
          className="hidden"
          id="bannerFile"
          accept="image/png,image/jpeg,image/webp,image/gif"
        />

        <label
          htmlFor="bannerFile"
          className={`h-24 block relative rounded-t-lg group cursor-pointer bg-center bg-cover ${
            bannerSrc ? '' : 'bg-gradient-to-br from-red-400 to-indigo-600'
          }`}
          style={bannerSrc ? { backgroundImage: `url(${bannerSrc})` } : {}}
        >
          <div className="rounded-t-lg absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
            <IconEdit className="w-10 h-10" />
          </div>
        </label>

        <input
          type="file"
          {...register('avatarFile')}
          className="hidden"
          id="avatarFile"
          accept="image/png,image/jpeg,image/webp,image/gif"
        />

        <label
          htmlFor="avatarFile"
          className="flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover"
          style={avatarSrc ? { backgroundImage: `url(${avatarSrc})` } : {}}
        >
          {!avatarSrc && (
            <div className="text-tertiary text-3xl font-medium overflow-hidden">
              {initials}
            </div>
          )}
          <div className="absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
            <IconEdit className="w-10 h-10" />
          </div>
        </label>

        <div className="pl-30 pr-5 pt-2 text-left">
          <input
            {...register('displayName', { maxLength: 100, required: true })}
            placeholder="Display Name"
            className="h-9 px-1.5 w-full text-primary font-medium bg-transparent focus:outline-none border-b dark:border-gray-700 dark:focus:border-blue-500 transition"
            maxLength={100}
          />
        </div>

        <div className="pb-5 space-y-3 pt-3 px-5 text-left">
          <div className="text-sm text-accent flex items-center pt-3">
            <span className={`h-7 flex items-center`}>
              joincomet.app/+{server?.name ?? ''}
            </span>
            {!server && (
              <input
                {...register('name')}
                placeholder="Name"
                className="bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500"
                onKeyPress={() => setNameChanged(true)}
              />
            )}
          </div>

          <div className="flex items-center">
            <div className="text-13 font-medium text-tertiary pr-1.5">
              Category
            </div>
            <CategorySelect category={category} setCategory={setCategory} />
          </div>
        </div>

        <div className="dark:bg-gray-800 rounded absolute right-5 bottom-9 transform translate-y-1/2">
          <div className="flex items-center space-x-3">
            {!!server && server.owner.id === currentUser?.id && (
              <Tippy content="Delete Planet">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className={deleteButtonClass}
                >
                  <IconDelete className="w-5 h-5 text-primary" />
                </button>
              </Tippy>
            )}

            {!server ? (
              <button
                type="submit"
                className={buttonClass}
                disabled={
                  !displayName ||
                  !name ||
                  displayName?.length < 2 ||
                  name?.length < 3 ||
                  createLoading
                }
              >
                {createLoading ? (
                  <IconSpinner className="w-5 h-5 text-primary" />
                ) : (
                  <IconUserToServerArrow className="w-5 h-5 text-primary" />
                )}
              </button>
            ) : (
              <Tippy content="Save Changes">
                <button
                  type="submit"
                  className={buttonClass}
                  disabled={
                    !displayName || updateLoading || displayName?.length < 2
                  }
                >
                  {updateLoading ? (
                    <IconSpinner className="w-5 h-5 text-primary" />
                  ) : (
                    <IconCheck className="w-5 h-5 text-primary" />
                  )}
                </button>
              </Tippy>
            )}
          </div>
        </div>

        <div className="rounded-b-lg dark:bg-gray-750 h-9" />
      </form>

      <DeleteServerDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        server={server}
      />
    </Dialog>
  )
}

function DeleteServerDialog({ open, setOpen, server }) {
  const [password, setPassword] = useState('')
  const [deleteServer, { loading }] = useDeleteServerMutation()
  const { push } = useHistory()

  return (
    <Dialog isOpen={open} close={() => setOpen(false)}>
      <div className="max-w-md w-full rounded-md dark:bg-gray-800 shadow-lg p-4">
        <div className="text-red-400 text-2xl font-semibold">
          Delete {server.name}
        </div>

        <div className="text-secondary pb-5 pt-3 text-base">
          You will not be able to restore this planet.
        </div>

        <div className="text-left">
          <label htmlFor="confirmPassword" className="label">
            Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="textbox"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            className="cancel-button"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            type="button"
            disabled={!password || loading}
            onClick={() => {
              deleteServer({
                variables: { input: { password, serverId: server.id } }
              }).then(() => {
                setOpen(false)
                push('/home')
              })
            }}
          >
            Delete {server.name}
            {loading && <IconSpinner className="w-5 h-5 text-primary ml-3" />}
          </button>
        </div>
      </div>
    </Dialog>
  )
}
