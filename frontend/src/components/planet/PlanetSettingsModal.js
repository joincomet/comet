import { FiX, FiCheck } from 'react-icons/fi'
import { Modal } from 'react-responsive-modal'
import React, { useEffect, useState } from 'react'

import { colorsMap } from '@/lib/colorsMap'
import {
  useAddModeratorMutation,
  useSetPlanetColorMutation,
  useSetPlanetGalaxiesMutation
} from '@/lib/mutations/editPlanetMutations'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import { galaxies } from '@/lib/galaxies'

export default function PlanetSettingsModal({ open, setOpen, planet }) {
  const queryClient = useQueryClient()

  const mutateGalaxies = useSetPlanetGalaxiesMutation({
    onMutate: variables => {
      queryClient.setQueryData(['planet', { name: planet.name }], old => ({
        ...old,
        galaxies: variables.galaxies
      }))
    }
  })

  const mutateColors = useSetPlanetColorMutation({
    onMutate: variables => {
      queryClient.setQueryData(['planet', { name: planet.name }], old => ({
        ...old,
        color: variables.color
      }))
    }
  })

  const [modUsername, setModUsername] = useState('')

  const addMod = useAddModeratorMutation({
    onSuccess: (result, variables) => {
      toast.success(`Added ${variables.username} as a moderator!`)
      setModUsername('')
    },
    onError: error => toast.error(error.response.errors[0].message)
  })

  const [galaxy1, setGalaxy1] = useState(planet.galaxies[0] || 'none')
  const [galaxy2, setGalaxy2] = useState(planet.galaxies[1] || 'none')
  const [galaxy3, setGalaxy3] = useState(planet.galaxies[2] || 'none')

  useEffect(() => {
    const galaxies = []
    if (galaxy1 !== 'none') galaxies.push(galaxy1)
    if (galaxy2 !== 'none') galaxies.push(galaxy2)
    if (galaxy3 !== 'none') galaxies.push(galaxy3)
    mutateGalaxies.mutate({
      planetId: planet.id,
      galaxies: galaxies
    })
  }, [galaxy1, galaxy2, galaxy3])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOverlayClick={e => {
        e.stopPropagation()
        setOpen(false)
      }}
      animationDuration={150}
      center
      blockScroll={false}
      closeIcon={<FiX size={20} />}
    >
      <div className="p-6 lg:rounded-2xl bg-white dark:bg-gray-800 space-y-4">
        <div className="header-2 text-secondary">+{planet.name}</div>

        <div className="label text-tertiary">Galaxies</div>
        <div className="flex justify-between space-x-3">
          <select
            name="galaxy1"
            className="rounded dark:bg-gray-900 border-none focus:ring-0 w-1/3 text-sm font-medium h-10"
            value={galaxy1}
            onChange={e => {
              setGalaxy1(e.target.value)
            }}
          >
            <option value="none" disabled hidden>
              Galaxy 1
            </option>
            {galaxies
              .filter(galaxy => galaxy !== galaxy2 && galaxy !== galaxy3)
              .map(galaxy => (
                <option key={galaxy} value={galaxy}>
                  {galaxy}
                </option>
              ))}
          </select>
        </div>

        <div className="label text-tertiary">Planet Color</div>
        <div className="flex space-x-3">
          {Object.keys(colorsMap).map(color => (
            <div
              key={color}
              style={{ backgroundColor: `${colorsMap[color]}` }}
              className={`rounded-md h-6 cursor-pointer w-full relative`}
              onClick={() =>
                mutateColors.mutate({ planetId: planet.id, color })
              }
            >
              {planet.color === color && (
                <FiCheck
                  size={18}
                  className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
          ))}
        </div>

        <div className="label text-tertiary">Add moderator</div>
        <div className="flex space-x-3">
          <input
            value={modUsername}
            onChange={e => setModUsername(e.target.value)}
            placeholder="Moderator username"
            className="h-10 w-full bg-gray-200 dark:bg-gray-900 rounded px-3 text-sm font-medium focus:outline-none"
          />

          <button
            type="button"
            disabled={!modUsername || addMod.isLoading}
            onClick={() =>
              addMod.mutate({ planetId: planet.id, username: modUsername })
            }
            className="focus:outline-none disabled:opacity-50 transition px-4 rounded-full bg-blue-600 inline-flex items-center text-sm font-medium select-none"
          >
            {addMod.isLoading && (
              <div className="mr-3">
                <Spinner />
              </div>
            )}
            Add
          </button>
        </div>
      </div>
    </Modal>
  )
}
