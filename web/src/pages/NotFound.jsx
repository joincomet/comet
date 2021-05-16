import { Link } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function NotFound() {
  const [user] = useCurrentUser()
  return (
    <div className="h-full w-full">
      <div className="text-center space-y-3">
        <div className="text-primary text-4xl font-bold">Oh no!</div>
        <div className="text-primary text-xl font-medium">
          This page does not exist.
        </div>
        <Link
          to={user ? '/home' : '/'}
          className="block text-xl text-accent font-medium cursor-pointer hover:underline"
        >
          Return to home page
        </Link>
      </div>
    </div>
  )
}
