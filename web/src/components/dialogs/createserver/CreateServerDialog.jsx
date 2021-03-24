import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import {
  serverListItem,
  serverListItemDot
} from '@/components/serverlist/ServerList.module.scss'
import Dialog from '@/components/dialogs/base/Dialog'
import { IconEditAvatar, IconUploadPhoto, IconCreateServer } from '@/lib/Icons'
import Button from '@/components/ui/Button'
import { Switch, Dialog as HDialog } from '@headlessui/react'
import { readURL } from '@/lib/readURL'
import { useMutation } from 'urql'
import { CREATE_SERVER } from '@/graphql/mutations'
import { useTranslation } from 'react-i18next'

export default function CreateServerDialog() {
  const [{ fetching }, createServer] = useMutation(CREATE_SERVER)
  const [isOpen, setIsOpen] = useState(false)
  const [privatePlanet, setPrivate] = useState(true)

  const { handleSubmit, register, watch, reset } = useForm()

  const avatarFile = watch('avatarFile')

  const [avatarSrc, setAvatarSrc] = useState(null)

  useEffect(() => {
    if (!open) return
    reset()
    setAvatarSrc(null)
    setPrivate(true)
  }, [open])

  useEffect(() => {
    if (!avatarFile || !avatarFile[0]) return
    readURL(avatarFile[0]).then(url => setAvatarSrc(url))
  }, [avatarFile])

  const { push } = useHistory()

  const onSubmit = variables => {
    createServer({
      variables: { ...variables, avatarFile: avatarFile ? avatarFile[0] : null }
    }).then(({ data: { createServer } }) => {
      push(`/server/${createServer.id}`)
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <Tippy content={t('server.create.title')} placement="right">
        <div className={serverListItem} onClick={() => setIsOpen(true)}>
          <div
            className={`${serverListItemDot} dark:bg-gray-800 bg-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500`}
          >
            <IconCreateServer
              className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
            />
          </div>
        </div>
      </Tippy>

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <HDialog.Title className="title mb-4">
          {t('server.create.title')}
        </HDialog.Title>
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
              className="textbox"
              id="name"
            />
          </div>

          <Button loading={fetching}>{t('continue')}</Button>

          <Switch.Group
            as="div"
            className="w-full flex items-center space-x-3 mt-4"
          >
            <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
              {t('server.create.requireInvite')}
            </Switch.Label>
            <Switch
              as="button"
              checked={privatePlanet}
              onChange={setPrivate}
              className={`${
                privatePlanet ? 'bg-blue-500' : 'dark:bg-gray-800'
              } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
            >
              {({ checked }) => (
                <span
                  className={`${
                    checked ? 'translate-x-5' : 'translate-x-0'
                  } inline-block w-5 h-5 transition duration-200 ease-in-out transform dark:bg-white rounded-full`}
                />
              )}
            </Switch>
          </Switch.Group>
        </form>
      </Dialog>
    </>
  )
}
