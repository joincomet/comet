import { FiUser } from 'react-icons/fi'
import { forwardRef } from 'react'
import Avatar from '@/components/ui/Avatar'

export default forwardRef(
  ({ user, loading = 'eager', className = 'w-10 h-10' }, ref) => {
    if (!user) return null
    return (
      <Avatar
        ref={ref}
        name={user.username}
        avatarUrl={user.avatarUrl}
        loading={loading}
        className={className}
      >
        <FiUser className="text-gray-500 w-1/2 h-1/2" />
      </Avatar>
    )
  }
)
