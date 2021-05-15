import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Dialog from '@/components/ui/dialog/Dialog'
import {
  IconCreateServer,
  IconEdit,
  IconEditAvatar,
  IconSpinner,
  IconUploadPhoto,
  IconUserToServerArrow
} from '@/components/ui/icons/Icons'
import Button from '@/components/ui/Button'
import { readURL } from '@/utils/readURL'
import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/server/list/ServerListItem'
import Switch from '@/components/ui/Switch'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import { CurrentUserDocument, useCreateServerMutation } from '@/graphql/hooks'
import ctl from '@netlify/classnames-template-literals'

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

export default function CreateServerDialog() {
  const [createServer, { loading }] = useCreateServerMutation({
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
  const [isOpen, setIsOpen] = useState(false)
  const [isPublic, setPublic] = useState(true)

  const { handleSubmit, register, watch, reset } = useForm()

  const avatarFile = watch('avatarFile')
  const name = watch('name')

  const [avatarSrc, setAvatarSrc] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    reset()
    setAvatarSrc(null)
    setPublic(true)
  }, [isOpen])

  useEffect(() => {
    if (!avatarFile || !avatarFile[0]) return
    readURL(avatarFile[0]).then(url => setAvatarSrc(url))
  }, [avatarFile])

  const { push } = useHistory()

  const onSubmit = ({ name, avatarFile }) => {
    createServer({
      variables: {
        input: { name, avatarFile: avatarFile ? avatarFile[0] : null }
      }
    }).then(({ data: { createServer } }) => {
      setIsOpen(false)
      push(`/server/${createServer.id}`)
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <ServerListItem
        name={t('server.create.title')}
        onClick={() => setIsOpen(true)}
        className="dark:bg-gray-800 bg-gray-200 hover:bg-purple-600 dark:hover:bg-purple-600"
      >
        <IconCreateServer
          className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
        />
      </ServerListItem>

      <Dialog
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        closeOnOverlayClick
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg dark:bg-gray-800 max-w-lg w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <div className="h-24 bg-gradient-to-br from-red-400 to-indigo-600 relative rounded-t-lg group cursor-pointer">
            <div className="absolute inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
              <IconEdit className="w-10 h-10" />
            </div>
          </div>

          <input
            type="file"
            {...register('avatarFile')}
            className="hidden"
            id="avatarFile"
            accept="image/png,image/jpeg,image/webp,image/gif"
          />

          <label
            htmlFor="avatarFile"
            className="cursor-pointer rounded-3xl h-24 w-24 absolute left-3 top-24 transform -translate-y-1/2 dark:bg-gray-700 shadow group bg-center bg-cover"
            style={avatarSrc ? { backgroundImage: `url(${avatarSrc})` } : {}}
          >
            <div className="absolute rounded-3xl inset-0 transition bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
              <IconEdit className="w-10 h-10" />
            </div>
          </label>

          <div className="pl-30 pr-5 pt-2 text-left">
            <input
              placeholder="Display Name"
              className="h-9 px-1.5 w-full text-primary font-medium bg-transparent focus:outline-none border-b dark:border-gray-700 dark:focus:border-blue-500 transition"
            />
          </div>

          <div className="pb-5 space-y-3 pt-3 px-5 text-left">
            <div className="text-sm text-accent flex items-center py-3">
              <span className="h-7 flex items-center">joincomet.app/+</span>
              <input
                placeholder="Name"
                className="bg-transparent h-7 w-full border-b dark:border-gray-700 focus:outline-none transition dark:focus:border-blue-500"
              />
            </div>

            <Switch
              className="text-13 font-medium text-tertiary"
              checked={isPublic}
              onChange={() => setPublic(!isPublic)}
            >
              Public visibility
            </Switch>
          </div>

          <div className="dark:bg-gray-800 rounded absolute right-5 bottom-9 transform translate-y-1/2">
            <button type="submit" className={buttonClass}>
              {loading ? (
                <IconSpinner className="w-5 h-5 text-primary" />
              ) : (
                <IconUserToServerArrow className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>

          <div className="rounded-b-lg dark:bg-gray-750 h-9" />
        </form>
      </Dialog>
    </>
  )
}
