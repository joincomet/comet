import {
  FiEdit,
  FiLink,
  FiImage,
  FiPlus,
  FiChevronDown,
  FiUser,
  FiBarChart2,
  FiVideo
} from 'react-icons/fi'
import { RiFileGifLine } from 'react-icons/ri'
import { CgArrowLeft } from 'react-icons/cg'
import React from 'react'
import Dropdown from '@/components/Dropdown'
import { usePlanets } from '@/hooks/usePlanets'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import NavLink from '@/components/NavLink'

const button =
  'p-2.5 cursor-pointer transition dark:hover:bg-gray-700 rounded-full mr-3 text-blue-500'

export default function CreatePostCard() {
  return (
    <div className="pt-3 pb-2 sm:rounded-md shadow-md bg-white dark:bg-gray-800">
      <div className="flex pl-3 pr-3 sm:pr-16">
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700`}
        >
          <FiUser size={20} className="m-2.5 text-gray-500" />
        </div>
        <textarea
          placeholder="Share something with the community"
          className="w-full rounded-xl px-4 bg-gray-100 dark:bg-gray-900 border-none text-sm ml-3 h-16 resize-none transition"
        />
      </div>
      <div className="flex text-tertiary pl-16 mt-2 items-center">
        <Tippy content="Upload Images" placement="bottom">
          <div className={button}>
            <FiImage size={20} />
          </div>
        </Tippy>
        <Tippy content="Add Gif" placement="bottom">
          <div className={button}>
            <RiFileGifLine size={20} />
          </div>
        </Tippy>
        <Tippy content="Upload Video" placement="bottom">
          <div className={button}>
            <FiVideo size={20} />
          </div>
        </Tippy>
        <Tippy content="Add Link" placement="bottom">
          <div className={button}>
            <FiLink size={20} />
          </div>
        </Tippy>
        <Tippy content="Add Poll" placement="bottom">
          <div className={button}>
            <FiBarChart2 size={20} />
          </div>
        </Tippy>

        <div className="inline-flex items-center ml-auto mr-16 opacity-50">
          <div className="cursor-pointer px-4 h-8 whitespace-nowrap inline-flex items-center text-secondary hover:text-white bg-transparent border dark:border-gray-700 dark:hover:bg-gray-700 transition rounded-full text-sm font-medium">
            <FiUser className="w-6 h-6 p-0.5 mr-3 text-blue-500" />
            My Profile
            <FiChevronDown className="w-4 h-4 ml-3" />
          </div>
          <CgArrowLeft size={20} className="ml-1.5" />
          <div className="ml-1.5 bg-blue-500 rounded-full shadow px-4 h-8 text-white text-sm font-medium inline-flex items-center">
            Post
          </div>
        </div>
      </div>
    </div>
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
      button={
        <div className="focus:outline-none px-4 h-8 inline-flex items-center text-secondary hover:text-white bg-transparent border dark:border-gray-700 dark:hover:bg-gray-700 transition   rounded-full text-sm font-medium">
          <FiUser className="w-6 h-6 p-0.5 mr-3 text-blue-500" />
          My Profile
          <FiChevronDown className="w-4 h-4 ml-3" />
        </div>
      }
      className="bg-gray-800 border border-gray-700 rounded-md shadow-lg"
    >
      {[
        <div
          key="__myprofile"
          className="focus:outline-none text-secondary w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition  "
        >
          <FiUser className="w-6 h-6 p-0.5 mr-3 rounded-full text-blue-500" />
          My Profile
        </div>
      ].concat(
        data.map(planet => (
          <div
            key={planet.id}
            className="focus:outline-none text-secondary w-full h-full font-medium inline-flex items-center text-sm px-4 py-2 hover:bg-gray-700 transition  "
          >
            <Image
              width={24}
              height={24}
              alt={planet.name}
              src={planet.avatarURL}
              className="w-6 h-6 rounded-full"
            />
            <span className="ml-3">+{planet.name}</span>
          </div>
        ))
      )}
    </Dropdown>
  )
}
