import { Link, useParams, useLocation, NavLink } from 'react-router-dom'
import { RiFireFill } from 'react-icons/ri'
import { HiChevronDown, HiClock, HiSortAscending } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import MenuTransition from '@/components/ui/MenuTransition'
import { useQueryParams } from '@/lib/useQueryParams'
import { capitalize } from '@/lib/capitalize'

export default function SidebarSortButtons() {
  const { serverId } = useParams()
  const { sort } = useQueryParams()

  const pathname = serverId ? `/server/${serverId}/posts` : '/posts'
  const toHot = { pathname }
  const toNew = { pathname, search: '?sort=new' }
  const toTop = { pathname, search: '?sort=top' }

  return (
    <div className="space-y-0.5">
      <NavLink
        to={toHot}
        className="sidebar-item"
        activeClassName="sidebar-item--active"
        isActive={match => match && !sort}
        exact
      >
        <RiFireFill className="w-5 h-5 mr-3" />
        Hot
      </NavLink>

      <NavLink
        to={toNew}
        className="sidebar-item"
        activeClassName="sidebar-item--active"
        isActive={match => match && sort === 'new'}
        exact
      >
        <HiClock className="w-5 h-5 mr-3" />
        New
      </NavLink>

      <NavLink
        to={toTop}
        className="sidebar-item"
        activeClassName="sidebar-item--active"
        isActive={match => match && sort === 'top'}
        exact
      >
        <div className="inline-flex items-center h-full">
          <HiSortAscending className="w-5 h-5 mr-3" />
          Top
        </div>

        {sort === 'top' && <TimePicker />}
      </NavLink>
    </div>
  )
}

function TimePicker() {
  const { planetId } = useParams()
  const { time } = useQueryParams()

  return (
    <div className="relative inline-block ml-auto">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex justify-center text-xs focus:outline-none font-medium">
              {time ? capitalize(time) : 'Day'}
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 w-56 mt-2 origin-top-right dark:bg-gray-950 rounded-md shadow-lg outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#account-settings"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#support"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Support
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item
                    as="span"
                    disabled
                    className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                  >
                    New feature (soon)
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#license"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        License
                      </a>
                    )}
                  </Menu.Item>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#sign-out"
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
