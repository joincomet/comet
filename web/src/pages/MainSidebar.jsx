import React, { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { HiPlus, HiUserGroup } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import Logo from '@/components/ui/icons/Logo'
import { useGroupsAndDms } from '@/components/DataProvider'
import UserAvatar from '@/components/user/UserAvatar'

export default forwardRef((props, ref) => {
  const groupsAndDms = useGroupsAndDms()
  return (
    <Sidebar ref={ref}>
      <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
        <Logo className="h-4" />
      </div>

      <div className="px-1.5">
        <div className="sidebar-label">FEED</div>

        <SidebarSortButtons />

        <NavLink
          to="/friends"
          activeClassName="sidebar-item--active"
          className="sidebar-item sidebar-item--large mt-3"
        >
          <HiUserGroup className="mr-3 h-5 w-5" />
          Friends
        </NavLink>

        <div
          className={`px-3 pt-4 pb-1 text-gray-500 dark:text-gray-500 uppercase text-11 font-semibold tracking-widest flex items-center justify-between hover:text-gray-600 dark:hover:text-gray-400 select-none`}
        >
          DIRECT MESSAGES
          <Tippy content="Create DM">
            <div>
              <HiPlus className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
            </div>
          </Tippy>
        </div>

        {groupsAndDms.map(groupOrDm => {
          if (groupOrDm.__typename === 'Group') {
            const group = groupOrDm
            return <div>Group</div>
          } else if (groupOrDm.__typename === 'User') {
            const user = groupOrDm
            return (
              <NavLink
                to={`/dm/${user.id}`}
                activeClassName="sidebar-item--active"
                className="sidebar-item sidebar-item--large"
                key={`user-${user.id}`}
              >
                <UserAvatar
                  size={9}
                  showOnline
                  user={user}
                  dotClassName="ring-3 w-2.5 h-2.5 ring-gray-800"
                />
                <span className="ml-3">{user.name}</span>
              </NavLink>
            )
          }
        })}
      </div>
    </Sidebar>
  )
})
