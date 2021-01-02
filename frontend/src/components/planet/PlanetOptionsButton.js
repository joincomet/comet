import { Menu, Transition } from '@headlessui/react'
import { FiMoreHorizontal, FiImage, FiSettings } from 'react-icons/fi'
import { menuTransition } from '@/lib/menuTransition'
import React, { useEffect, useState } from 'react'
import { useUploadPlanetBannerMutation } from '@/lib/mutations/editPlanetMutations'
import { useQueryClient } from 'react-query'
import { useIsModOrAdmin } from '@/lib/useIsMod'
import PlanetSettingsModal from '@/components/planet/PlanetSettingsModal'

export default function PlanetOptionsButton({ planet }) {
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

  const isModOrAdmin = useIsModOrAdmin(planet)

  const [settings, setSettings] = useState(false)

  return (
    <>
      <PlanetSettingsModal
        open={settings}
        setOpen={setSettings}
        planet={planet}
      />
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
                  className="left-0 w-56 origin-top-left menu-items"
                >
                  {isModOrAdmin && (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-tertiary menu-item`}
                          >
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
                              className="flex items-center cursor-pointer"
                            >
                              <FiImage size={18} className="mr-4" />
                              Upload Banner
                            </label>
                          </div>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } text-tertiary menu-item`}
                            onClick={() => setSettings(true)}
                          >
                            <FiSettings size={18} className="mr-4" />
                            Planet Settings
                          </div>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  )
}
