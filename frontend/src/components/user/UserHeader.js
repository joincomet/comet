import React from 'react'
import SubHeaderBase from '@/components/layout/SubHeaderBase'
import UserAvatar from '@/components/user/UserAvatar'
import UserFollowButton from '@/components/user/UserFollowButton'
import NavLink from '@/components/NavLink'

export default function UserHeader({ user, show }) {
  return (
    <SubHeaderBase show={show}>
      <NavLink href={`/user/${user.name}`} className="inline-flex items-center">
        <UserAvatar user={user} />
        <div className="ml-4 header-3">@{user.username}</div>
      </NavLink>

      <div className="ml-auto">
        {!user.isCurrentUser && <UserFollowButton user={user} />}
      </div>
    </SubHeaderBase>
  )
}
