import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconPlanetCreate from '@/components/ui/icons/IconPlanetCreate'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { PLANETS_QUERY } from '@/lib/queries/usePlanets'
import Modal from 'react-responsive-modal'
import Tippy from '@tippyjs/react'
import 'react-responsive-modal/styles.css'
import {
  planetScrollerItem,
  planetScrollerItemDot
} from './PlanetScroller.module.scss'
import { modal, overlay } from './CreatePlanetDialog.module.css'
import { HiOutlinePhotograph, HiOutlinePencil } from 'react-icons/hi'
import { Switch } from '@headlessui/react'
import IconSpinner from '@/components/ui/icons/IconSpinner'

const CREATE_PLANET_MUTATION = gql`
  mutation createPlanet($name: String!, $avatarFile: Upload) {
    createPlanet(name: $name, avatarFile: $avatarFile) {
      id
    }
  }
`

export default function CreatePlanetDialog() {
  const [createPlanet, { data, loading, error }] = useMutation(
    CREATE_PLANET_MUTATION,
    {
      refetchQueries: [{ query: PLANETS_QUERY }],
      awaitRefetchQueries: true
    }
  )
  const [open, setOpen] = useState(false)
  const [privatePlanet, setPrivate] = useState(true)

  const { handleSubmit, register, watch, reset } = useForm()

  const avatarFile = watch('avatarFile')

  const readURL = file => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = e => res(e.target.result)
      reader.onerror = e => rej(e)
      reader.readAsDataURL(file)
    })
  }

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
    createPlanet({
      variables: { ...variables, avatarFile: avatarFile ? avatarFile[0] : null }
    }).then(({ data: { createPlanet } }) => {
      push(createPlanet.id)
    })
  }

  return (
    <>
      <Tippy content="Create Planet" placement="right">
        <div className={planetScrollerItem} onClick={() => setOpen(true)}>
          <div
            className={`${planetScrollerItemDot} dark:bg-gray-800 bg-gray-200 hover:bg-purple-500 dark:hover:bg-purple-500`}
          >
            <IconPlanetCreate
              className={`w-5 h-5 text-purple-500 group-hover:text-white transition`}
            />
          </div>
        </div>
      </Tippy>

      <Modal
        center
        open={open}
        onClose={() => setOpen(false)}
        classNames={{
          modal,
          overlay
        }}
        showCloseIcon={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          <div className="title mb-4">Create a Planet</div>

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
              <HiOutlinePhotograph className="w-6 h-6" />
              <div className="text-sm pt-1">Upload</div>
            </label>
          ) : (
            <label
              htmlFor="avatarFile"
              className="transition rounded-full h-24 w-24 block mb-4 cursor-pointer select-none group relative"
            >
              <HiOutlinePencil className="absolute w-6 h-6 text-white inset-1/2 transform -translate-x-1/2 -translate-y-1/2 transition opacity-0 group-hover:opacity-100" />
              <img
                src={avatarSrc}
                className="w-full h-full object-cover rounded-full transition group-hover:opacity-25"
                alt="Planet image"
              />
            </label>
          )}

          <div className="mb-4 w-full">
            <label className="label" htmlFor="name">
              Planet Name
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

          <button type="submit" className="button" disabled={loading}>
            Continue
            {loading && <IconSpinner className="ml-3" />}
          </button>

          <Switch.Group
            as="div"
            className="w-full flex items-center space-x-3 mt-4"
          >
            <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
              Require Invite to Join
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
      </Modal>
    </>
  )
}
