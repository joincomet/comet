import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import {
  IconCheck,
  IconEdit,
  IconSpinner,
  IconUserToServerArrow
} from '@/components/ui/icons/Icons'
import { readURL } from '@/utils/readURL'
import {
  CurrentUserDocument,
  ServerCategory,
  useCreateServerMutation,
  useUpdateServerMutation
} from '@/graphql/hooks'
import CategorySelect from '@/components/server/CategorySelect'
import Tippy from '@tippyjs/react'
import StyledDialog from '@/components/ui/dialog/StyledDialog'
import Switch from '@/components/ui/Switch'

const serverRegex = /^[A-Za-z0-9_]+$/i

export default function CreateServerDialog({ open, setOpen, server }) {
  const [isDownvotesEnabled, setIsDownvotesEnabled] = useState(
    server?.isDownvotesEnabled ?? false
  )
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
  const { handleSubmit, register, watch, reset, setValue, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  })
  watch((values, { type, value, name }) => {
    if (name === 'avatarFile') {
      const {avatarFile} = values
      if (!avatarFile || !avatarFile[0]) return
      readURL(avatarFile[0]).then(url => setAvatarSrc(url))
    } else if (name === 'bannerFile') {
      const {bannerFile} = values
      if (!bannerFile || !bannerFile[0]) return
      readURL(bannerFile[0]).then(url => setBannerSrc(url))
    }
  })
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
      reset()
      setAvatarSrc(null)
      setBannerSrc(null)
      setCategory(ServerCategory.Other)
      setIsDownvotesEnabled(false)
    } else {
      //reset()
      setAvatarSrc(server.avatarUrl)
      setBannerSrc(server.bannerUrl)
      setValue('displayName', server.displayName)
      setValue('description', server.description || '')
      setCategory(server.category)
      setIsDownvotesEnabled(server.isDownvotesEnabled)
    }
  }, [server])

  const { push } = useHistory()

  const onSubmit = ({
    name,
    displayName,
    description,
    avatarFile,
    bannerFile
  }) => {
    if (!server) {
      createServer({
        variables: {
          input: {
            name,
            displayName,
            description,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null,
            isDownvotesEnabled
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
            description,
            category,
            avatarFile: avatarFile ? avatarFile[0] : null,
            bannerFile: bannerFile ? bannerFile[0] : null,
            isDownvotesEnabled
          }
        }
      }).then(() => {
        setOpen(false)
      })
    }
  }

  const initials = (displayName || '')
    .split(' ')
    .map(s => s[0])
    .join('')
    .toUpperCase()

  const close = () => {
    setOpen(false)
  }

  return (
    <StyledDialog
      open={open}
      close={close}
      closeOnOverlayClick
      onSubmit={handleSubmit(onSubmit)}
      buttons={
        !server ? (
          <button
            type="submit"
            className={`form-button-submit`}
            disabled={
              !displayName ||
              !name ||
              displayName?.length < 2 ||
              name?.length < 3 ||
              createLoading || !serverRegex.test(name)
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
              className={`form-button-submit`}
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
        )
      }
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
        className="flex items-center justify-center cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover bg-white"
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
          className="form-input-lg"
          maxLength={100}
        />
      </div>

      <div className="pb-5 space-y-3 pt-3 px-5 text-left">
        <div>
          <div className="text-sm text-accent flex items-center pt-3">
          <span className={`h-7 flex items-center`}>
            joincomet.app/+{server?.name ?? ''}
          </span>
            {!server && (
              <input
                {...register('name', { pattern: serverRegex, required: true, minLength: 3, maxLength: 21 })}
                minLength={3}
                maxLength={21}
                placeholder="Name"
                className="bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500"
                onKeyPress={() => setNameChanged(true)}
              />
            )}
          </div>
          {errors.name?.type === 'pattern' && (
            <div className="form-error">Letters, numbers and underscores only</div>
          )}
        </div>


        <textarea
          {...register('description', { maxLength: 500 })}
          placeholder="Description"
          className="form-textarea"
          maxLength={500}
        />

        <div className="flex items-center">
          <div className="text-13 font-medium text-tertiary pr-1.5">
            Category
          </div>
          <CategorySelect category={category} setCategory={setCategory} />
        </div>

        <div className="pt-2">
          <Switch
            checked={isDownvotesEnabled}
            onChange={() => setIsDownvotesEnabled(!isDownvotesEnabled)}
            green
          >
            <div className="text-13 font-medium text-tertiary">
              Downvotes enabled
            </div>
          </Switch>
        </div>
      </div>
    </StyledDialog>
  )
}
