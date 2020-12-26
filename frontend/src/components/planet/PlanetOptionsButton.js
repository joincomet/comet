import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { Menu, Transition } from '@headlessui/react'
import { FiMoreHorizontal, FiImage } from 'react-icons/fi'
import { menuTransition } from '@/lib/menuTransition'
import React, { useEffect, useState } from 'react'
import { useUploadPlanetBannerMutation } from '@/lib/mutations/editPlanetMutations'
import { useQueryClient } from 'react-query'

export default function PlanetOptionsButton({ planet }) {
  const menuItem =
    'cursor-pointer transition flex items-center w-full px-4 py-2.5 text-sm font-medium text-left focus:outline-none select-none'

  const currentUser = useCurrentUser().data

  const queryClient = useQueryClient()

  const [bannerImage, setBannerImage] = useState(null)

  useEffect(() => {
    if (!bannerImage || bannerImage.length === 0) return
    uploadBanner
      .mutateAsync({ file: bannerImage[0], planetId: planet.id })
      .then(bannerUrl => {
        planet.bannerUrl = bannerUrl
        queryClient.invalidateQueries(['planet', { name: planet.name }])
        // queryClient.setQueryData(['planet', { name: planet.name }], planet)
      })
  }, [bannerImage])

  const uploadBanner = useUploadPlanetBannerMutation()

  const isModerator =
    currentUser &&
    currentUser.moderatedPlanets &&
    currentUser.moderatedPlanets.map(p => p.id).includes(planet.id)

  return (
    <div className="relative inline-block z-30">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="focus:outline-none w-8 h-8 rounded-full border text-white border-gray-500 bg-black bg-opacity-25 inline-flex items-center justify-center cursor-pointer transition transform hover:scale-105">
              <FiMoreHorizontal size={18} />
            </Menu.Button>

            <Transition show={open} {...menuTransition}>
              <Menu.Items
                static
                className="absolute left-0 w-56 origin-top-left bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
              >
                {currentUser && (isModerator || currentUser.admin) && (
                  <Menu.Item>
                    {({ active }) => (
                      <>
                        <input
                          name="bannerImage"
                          id="bannerImage"
                          className="hidden"
                          accept="image/png, image/jpeg"
                          type="file"
                          onChange={e => setBannerImage(e.target.files)}
                        />
                        <label
                          htmlFor="bannerImage"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } text-tertiary ${menuItem}`}
                        >
                          <FiImage size={18} className="mr-4" />
                          Upload Banner
                        </label>
                      </>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
