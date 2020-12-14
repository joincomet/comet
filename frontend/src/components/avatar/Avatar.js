import Image from 'next/image'
import { FiUser } from 'react-icons/fi'

export default function Avatar({
  avatarUrl,
  loading = 'lazy',
  className = 'w-10 h-10'
}) {
  return (
    <div
      className={`relative flex-shrink-0 rounded-full inline-flex ${className} ${
        avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          loading={loading}
          layout="fill"
          className="rounded-full object-cover object-center"
        />
      ) : (
        <FiUser className="text-gray-500 w-1/2 h-1/2 m-auto" />
      )}
    </div>
  )
}
