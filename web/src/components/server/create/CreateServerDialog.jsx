import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Dialog from '@/components/ui/dialog/Dialog'
import {
  IconCreateServer,
  IconEditAvatar,
  IconUploadPhoto
} from '@/components/ui/icons/Icons'
import Button from '@/components/ui/Button'
import { readURL } from '@/utils/readURL'
import { useMutation } from 'urql'
import { CREATE_SERVER } from '@/graphql/mutations'
import { useTranslation } from 'react-i18next'
import ServerListItem from '@/components/server/list/ServerListItem'
import Switch from '@/components/ui/Switch'
import DialogTitle from '@/components/ui/dialog/DialogTitle'

export default function CreateServerDialog() {
  const [{ fetching }, createServer] = useMutation(CREATE_SERVER)
  const [isOpen, setIsOpen] = useState(false)
  const [privateServer, setPrivate] = useState(true)

  const { handleSubmit, register, watch, reset } = useForm()

  const avatarFile = watch('avatarFile')

  const [avatarSrc, setAvatarSrc] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    reset()
    setAvatarSrc(null)
    setPrivate(true)
  }, [isOpen])

  useEffect(() => {
    if (!avatarFile || !avatarFile[0]) return
    readURL(avatarFile[0]).then(url => setAvatarSrc(url))
  }, [avatarFile])

  const { push } = useHistory()

  const onSubmit = ({ name }) => {
    createServer({ name, avatarFile: avatarFile ? avatarFile[0] : null }).then(
      ({ data: { createServer } }) => {
        setIsOpen(false)
        push(`/server/${createServer.id}`)
      }
    )
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

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogTitle className="title mb-4">
          {t('server.create.title')}
        </DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <input
            type="file"
            {...register('avatarFile')}
            className="hidden"
            id="avatarFile"
            accept="image/png, image/jpeg"
          />

          {!avatarSrc ? (
            <label
              htmlFor="avatarFile"
              className="transition dark:hover:bg-gray-700 rounded-full h-24 w-24 border-2 text-tertiary border-dashed border-gray-600 dark:border-gray-400 flex flex-col items-center justify-center mb-4 cursor-pointer select-none"
            >
              <IconUploadPhoto className="w-6 h-6" />
              <div className="text-sm pt-1">{t('server.create.upload')}</div>
            </label>
          ) : (
            <label
              htmlFor="avatarFile"
              className="transition rounded-full h-24 w-24 block mb-4 cursor-pointer select-none group relative"
            >
              <IconEditAvatar className="absolute w-6 h-6 text-white inset-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 group-hover:opacity-100" />
              <img
                src={avatarSrc}
                className="w-full h-full object-cover rounded-full transition group-hover:opacity-25"
                alt=""
              />
            </label>
          )}

          <div className="mb-4 w-full">
            <label className="label text-left" htmlFor="name">
              {t('server.create.name')}
            </label>

            <input
              {...register('name', {
                required: true,
                maxLength: 100
              })}
              maxLength={100}
              className="textbox px-3"
              id="name"
            />
          </div>

          <div className="pb-4 w-full">
            <Button loading={fetching}>{t('continue')}</Button>
          </div>

          <Switch
            checked={privateServer}
            onChange={() => setPrivate(!privateServer)}
          >
            {t('server.create.requireInvite')}
          </Switch>
        </form>
      </Dialog>
    </>
  )
}
