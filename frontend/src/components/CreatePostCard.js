import {
  FiEdit,
  FiLink,
  FiImage,
  FiPlus,
  FiChevronDown,
  FiUser
} from 'react-icons/fi'
import React, { useState } from 'react'
import Dropdown from '@/components/Dropdown'
import { usePlanets } from '@/hooks/usePlanets'
import Image from 'next/image'

function AliasDropdown() {
  return (
    <Dropdown
      button={(
        <div className="focus:outline-none rounded-md shadow-sm focus:outline-none mr-auto sm:mr-0 px-4 py-1.5 inline-flex items-center text-secondary hover:text-white bg-transparent border dark:border-gray-700 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-full text-sm font-medium">
          <Image
            width={24}
            height={24}
            alt="Profile picture"
            src="/avatar.jpg"
            className="w-6 h-6 mr-3 rounded-full object-cover"
          />
          Dan Beneventano
          <FiChevronDown className="w-4 h-4 ml-3" />
        </div>
      )}
      className="bg-gray-800 border border-gray-700 rounded-md shadow-lg"
    >
      <div className="focus:outline-none text-secondary w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition duration-150 ease-in-out">
        <Image
          width={24}
          height={24}
          alt="Profile picture"
          src="/avatar.jpg"
          className="w-6 h-6 mr-3 rounded-full object-cover"
        />
        Dan Beneventano
      </div>

      <div className="focus:outline-none text-blue-500 w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition duration-150 ease-in-out">
        <FiPlus className="w-6 h-6 p-0.5 mr-3" />
        Create Alias
      </div>
    </Dropdown>
  )
}

function PlanetDropdown() {
  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    pageSize: 5
  })

  if (isLoading || isError) return null

  return (
    <Dropdown
      button={(
        <div className="focus:outline-none px-4 py-1.5 inline-flex items-center text-secondary hover:text-white bg-transparent border dark:border-gray-700 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-full text-sm font-medium">
          <FiUser className="w-6 h-6 p-0.5 mr-3 text-blue-500" />
          My Profile
          <FiChevronDown className="w-4 h-4 ml-3" />
        </div>
      )}
      className="bg-gray-800 border border-gray-700 rounded-md shadow-lg"
    >
      {[
        <div
          key="__myprofile"
          className="focus:outline-none text-secondary w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition duration-150 ease-in-out"
        >
          <FiUser className="w-6 h-6 p-0.5 mr-3 rounded-full text-blue-500" />
          My Profile
        </div>
      ].concat(
        data.map(planet => (
          <div
            key={planet.id}
            className="focus:outline-none text-secondary w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            <Image
              width={24}
              height={24}
              alt={planet.name}
              src={planet.avatarURL}
              className="w-6 h-6 mr-3 rounded-full"
            />
            +{planet.name}
          </div>
        ))
      )}
    </Dropdown>
  )
}

export default function CreatePostCard() {
  const [clicked, setClicked] = useState(false)

  return (
    <>
      <div
        onClick={() => setClicked(true)}
        className={`sm:rounded-md dark:bg-gray-800 bg-white px-5 py-5 mb-5 cursor-pointer shadow-lg z-20 relative transform transition duration-300 ease-in-out ${
          clicked ? 'sm:scale-102' : 'sm:hover:scale-102'
        }`}
      >
        <div className="flex">
          <Image
            width={48}
            height={48}
            alt="Profile Picture"
            src="/avatar.jpg"
            className="w-12 h-12 rounded-full mr-5"
          />
          <div>
            <div className="text-base font-semibold inline-flex items-start">
              Share something with the community
              <FiEdit className="w-5 h-5 ml-5 text-tertiary" />
            </div>
            <div className="mt-1 text-xs font-mono text-tertiary">
              Post images, links, and text
            </div>
          </div>
        </div>

        <div
          className={`pt-5 sm:px-16 space-y-5 ${clicked ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center w-full space-y-3 sm:space-y-0">
            <div className="flex flex-row items-center">
              <AliasDropdown />
            </div>
            <div className="flex flex-row items-center">
              <span className="mx-3 text-tertiary text-sm">to</span>
              <PlanetDropdown />
            </div>
          </div>

          <input
            placeholder="Title"
            className={`w-full h-10 text-sm bg-gray-900 px-5 rounded-md shadow focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out`}
          />

          <div className="inline-flex items-center flex-grow w-full">
            <FiLink
              style={{ top: '0.8125rem' }}
              className="h-4 w-4 ml-4 transform text-blue-500 transition duration-200 ease-in-out cursor-auto"
            />
            <input
              placeholder="Link URL"
              className={`-ml-8 w-full h-10 text-sm text-blue-500 bg-gray-900 px-12 rounded-md shadow focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out`}
            />
          </div>

          <textarea
            style={{ minHeight: '8rem' }}
            placeholder="Write something..."
            className="resize-none w-full text-sm rounded-md overflow-y-hidden bg-gray-900 px-5 py-2 focus:outline-none border border-gray-900 focus:border-blue-500 transition duration-200 ease-in-out"
          />

          <div className="flex">
            <div className="px-4 py-1.5 text-secondary hover:text-white inline-flex items-center bg-transparent border dark:border-gray-700 dark:hover:bg-gray-700 transition duration-200 ease-in-out rounded-full text-sm font-medium">
              <FiImage className="w-6 h-6 p-0.5 mr-3 text-blue-500" />
              Upload Images
            </div>

            <div
              onClick={e => {
                e.stopPropagation()
                setClicked(false)
              }}
              className="px-4 py-1.5 inline-flex items-center ml-auto dark:hover:bg-gray-700 transition duration-200 ease-in-out text-tertiary text-sm font-medium rounded-full"
            >
              Cancel
            </div>
            <div className="px-4 py-1.5 inline-flex items-center ml-6 text-white bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out rounded-full text-sm font-medium transform hover:scale-110">
              Post
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-10 h-full w-full transform transition ${
          clicked ? 'translate-x-0' : '-translate-x-full delay-150'
        }`}
        onClick={() => setClicked(false)}
      >
        <div
          className={`bg-black bg-opacity-50 h-full w-full transition duration-300 ease-in-out ${
            clicked ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </>
  )
}
