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
import { usePlanets } from '@/lib/queries/usePlanets'
import Image from 'next/image'
import Tippy from '@tippyjs/react'
import NavLink from '@/components/NavLink'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'

const button =
  'p-2.5 cursor-pointer transition dark:hover:bg-gray-700 rounded-full mr-3 text-blue-500'

export default function CreatePostCard() {
  const currentUser = useCurrentUser().data
  return (
    <div className="pt-3 pb-2 rounded bg-white dark:bg-gray-900">
      <div className="flex pl-3 pr-3 sm:pr-16">
        <UserAvatar user={currentUser} />
        <textarea
          placeholder="Share something with the community"
          className="w-full rounded px-4 bg-gray-100 dark:bg-gray-900 border-none text-sm ml-3 h-16 resize-none transition"
        />
      </div>
      <div className="flex text-tertiary pl-16 mt-2 items-center">
        <Tippy content="Upload Images" placement="bottom">
          <div className={button}>
            <FiImage size={20} />
          </div>
        </Tippy>
        {/*<Tippy content="Add Gif" placement="bottom">
          <div className={button}>
            <RiFileGifLine size={20} />
          </div>
        </Tippy>*/}
        {/*<Tippy content="Upload Video" placement="bottom">
          <div className={button}>
            <FiVideo size={20} />
          </div>
        </Tippy>*/}
        <Tippy content="Add Link" placement="bottom">
          <div className={button}>
            <FiLink size={20} />
          </div>
        </Tippy>
        {/*<Tippy content="Add Poll" placement="bottom">
          <div className={button}>
            <FiBarChart2 size={20} />
          </div>
        </Tippy>*/}

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
