import React from 'react'
import SubHeaderBase from '@/components/layout/SubHeaderBase'
import UserAvatar from '@/components/user/UserAvatar'
import UserFollowButton from '@/components/user/UserFollowButton'

export default function UserHeader({ user, show }) {
  return (
    <SubHeaderBase show={show}>
      <UserAvatar user={user} />
      <div className="ml-4 text-xl font-bold tracking-tight leading-none">
        {user.name}
        <span className="text-mid">&nbsp;@{user.username}</span>
      </div>

      <div className="ml-auto">
        <UserFollowButton user={user} />
      </div>
    </SubHeaderBase>
  )
}
