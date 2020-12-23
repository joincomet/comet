import Image from 'next/image'
import { FiUser } from 'react-icons/fi'

export default function UserAvatar({
  user,
  loading = 'lazy',
  className = 'w-10 h-10',
  showOnline = false
}) {
  return (
    <div
      className={`select-none relative flex-shrink-0 rounded-full inline-flex ${className} ${
        user && user.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      {user && user.avatarUrl ? (
        <img
          alt={user.username}
          src={user.avatarUrl}
          loading={loading}
          className="rounded-full object-cover object-center"
        />
      ) : (
        <FiUser className="text-gray-500 w-1/2 h-1/2 m-auto" />
      )}

      {showOnline && (
        <div
          className={`w-1/4 h-1/4 rounded-full ring-4 ring-white dark:ring-gray-800 bottom-0 right-0 absolute ${
            user && user.online ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      )}
    </div>
  )
}
