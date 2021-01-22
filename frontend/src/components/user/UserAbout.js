import React from 'react'

export default function UserAbout({ user }) {
  return (
    <div>
      <div className="text-xl font-bold tracking-tight leading-none text-secondary mb-4">
        About <span className="">{user.name}</span>
      </div>
      <div className="text-sm text-secondary font-medium">
        {user.bio || 'New CometX User'}
      </div>
    </div>
  )
}
