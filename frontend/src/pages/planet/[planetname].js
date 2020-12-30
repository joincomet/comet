import { QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import { useInView } from 'react-intersection-observer'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import SortOptions from '@/components/sort/SortOptions'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { FiCalendar, FiEdit2 } from 'react-icons/fi'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'
import PlanetHeader from '@/components/planet/PlanetHeader'
import CreatePostButton from '@/components/post/create/CreatePostButton'
import { NextSeo } from 'next-seo'
import {
  useEditPlanetDescriptionMutation,
  useUploadPlanetAvatarMutation
} from '@/lib/mutations/editPlanetMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import PlanetOptionsButton from '@/components/planet/PlanetOptionsButton'

export default function PlanetPage() {
  const { query } = useRouter()

  const currentUser = useCurrentUser().data

  const planetQuery = usePlanet({ name: query.planetname })
  const planet = planetQuery.data

  const { ref, inView } = useInView({ threshold: 0.8 })

  const { setDark, setTitle } = useHeaderStore()

  useEffect(() => setTitle(`+${planet.name}`), [])

  useEffect(() => setDark(!inView), [inView])

  const [avatarImage, setAvatarImage] = useState(null)

  const uploadAvatar = useUploadPlanetAvatarMutation()

  useEffect(() => {
    if (!avatarImage || avatarImage.length === 0) return
    uploadAvatar
      .mutateAsync({ file: avatarImage[0], planetId: planet.id })
      .then(avatarUrl => {
        planet.avatarUrl = avatarUrl
        planetQuery.refetch()
      })
  }, [avatarImage])

  const [editDesc, setEditDesc] = useState(false)
  const editDescMutation = useEditPlanetDescriptionMutation()
  const [newDesc, setNewDesc] = useState(planet.description || 'New Planet')

  const updateDescription = async () => {
    if (!newDesc) return
    const description = newDesc.trim()
    if (!description) return
    await editDescMutation.mutateAsync({ description, planetId: planet.id })
    planet.description = description
    planetQuery.refetch()
  }

  const isModerator =
    currentUser &&
    currentUser.moderatedPlanets &&
    currentUser.moderatedPlanets.map(p => p.id).includes(planet.id)

  return (
    <>
      <NextSeo
        title={`+${planet.name} – CometX`}
        description={planet.description}
        openGraph={{
          images: [
            {
              url: planet.avatarUrl
            }
          ]
        }}
      />

      <PlanetHeader planet={planet} show={!inView} />

      <CreatePostButton />

      <div
        className={`relative h-80 z-0 bg-center bg-cover ${
          !planet.bannerUrl ? 'bg-gradient-to-br from-red-400 to-blue-500' : ''
        }`}
        style={{
          backgroundImage: planet.bannerUrl ? `url(${planet.bannerUrl})` : ''
        }}
      >
        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-3 md:pt-6 md:pb-12">
          <div className="flex flex-col items-center md:items-start md:flex-row flex-grow mt-auto">
            <div className="label block md:hidden mb-4">
              {!planet.galaxies || planet.galaxies.length === 0 ? (
                <span className="hover:underline cursor-pointer">
                  uncategorized
                </span>
              ) : (
                planet.galaxies.map((galaxy, index) => (
                  <span key={galaxy} className="hover:underline cursor-pointer">
                    {index !== 0 && <span>&nbsp;&middot;&nbsp;</span>}
                    {galaxy}
                  </span>
                ))
              )}
            </div>
            <div className="relative group md:mr-6">
              <PlanetAvatar
                className="w-20 h-20 md:w-40 md:h-40 shadow-md"
                planet={planet}
              />

              {currentUser && (isModerator || currentUser.admin) && (
                <div className="absolute inset-0">
                  <input
                    type="file"
                    name="avatarImage"
                    id="avatarImage"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={e => setAvatarImage(e.target.files)}
                  />

                  <label
                    htmlFor="avatarImage"
                    className="cursor-pointer bg-black rounded-full w-full h-full inline-flex items-center justify-center bg-opacity-50 transition opacity-0 group-hover:opacity-100"
                  >
                    <FiEdit2 className="w-1/2 h-1/2" />
                  </label>
                </div>
              )}
            </div>

            <div className="flex flex-col w-full md:h-full items-center md:items-start justify-end space-y-4">
              <div className="label hidden md:block">
                {!planet.galaxies || planet.galaxies.length === 0 ? (
                  <span className="hover:underline cursor-pointer">
                    uncategorized
                  </span>
                ) : (
                  planet.galaxies.map((galaxy, index) => (
                    <span
                      key={galaxy}
                      className="hover:underline cursor-pointer"
                    >
                      {index !== 0 && <span>&nbsp;&middot;&nbsp;</span>}
                      {galaxy}
                    </span>
                  ))
                )}
              </div>
              <div className="header-1" ref={ref}>
                {planet.name}
              </div>

              <div className="block md:hidden text-tertiary label text-right">
                {planet.userCount} Members
              </div>

              <div className="inline-flex items-center space-x-4">
                <PlanetJoinButton planet={planet} />
                <PlanetOptionsButton planet={planet} />
              </div>
            </div>
          </div>

          <div className="hidden md:block mt-auto text-tertiary label text-right">
            <div>Members</div>
            <div>{planet.userCount}</div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent dark:to-gray-850 to-gray-100" />
      </div>

      <div className="mycontainer">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 pt-6 pb-28">
            <SortOptions />
            <Posts variables={getVariables(query)} showPlanet={false} />
          </div>

          <div className="col-span-0 md:col-span-1 hidden md:block">
            <div className="sticky top-28 pt-6">
              <div className="header-3 mb-4 text-secondary">
                About
                {currentUser && (isModerator || currentUser.admin) && (
                  <span
                    onClick={() => {
                      if (editDesc) {
                        updateDescription()
                        setEditDesc(false)
                      } else {
                        setEditDesc(true)
                      }
                    }}
                    className="ml-3 text-mid hover:underline cursor-pointer"
                  >
                    {editDesc ? 'Done' : 'Edit'}
                  </span>
                )}
              </div>

              <div>
                <div
                  className={`whitespace-pre-wrap prose prose-sm dark:prose-dark text-secondary ${
                    editDesc ? 'hidden' : 'block'
                  }`}
                >
                  {planet.description || 'New Planet'}
                </div>

                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className={`dark:bg-gray-800 h-24 rounded text-sm text-secondary font-medium block border-none resize-none p-3 focus:ring-0 w-full ${
                    editDesc ? 'block' : 'hidden'
                  }`}
                />
              </div>

              <div className="mt-4 text-tertiary text-sm font-medium inline-flex items-center">
                <FiCalendar size={16} className="mr-3" />
                Created {planet.timeSinceCreated}
              </div>

              <div className="text-xl font-bold tracking-tight leading-none mt-6 mb-4 text-secondary">
                Moderators
              </div>

              <div className="space-y-4">
                {planet.moderators.map(mod => (
                  <div className="block" key={mod.id}>
                    <UserPopup user={mod} placement="left-start">
                      <div className="flex items-center cursor-pointer">
                        <UserAvatar user={mod} className="w-9 h-9" />
                        <div className="ml-4 font-semibold text-sm text-secondary">
                          {mod.name}
                        </div>
                      </div>
                    </UserPopup>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const getVariables = query => {
  const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
  const time = query.time ? query.time.toUpperCase() : 'ALL'
  return {
    sort,
    time,
    planet: query.planetname,
    page: query.page ? parseInt(query.page) - 1 : 0
  }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  await globalPrefetch(queryClient, ctx)

  const k = ['planet', { name: query.planetname }]

  await queryClient.prefetchQuery(k, key => fetchPlanet(key, ctx))

  const planet = queryClient.getQueryData(k)

  if (query.planetname !== planet.name)
    return {
      redirect: {
        destination: `/planet/${planet.name}`,
        permanent: true
      }
    }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
