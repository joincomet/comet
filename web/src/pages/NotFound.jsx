import { Link } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import EndReached from '@/components/ui/EndReached'

export default function NotFound() {
  const [user] = useCurrentUser()
  return (
    <div className="relative h-full w-full dark:bg-gray-750 flex flex-col items-center justify-center p-6 text-center">
      <div className="text-center space-y-3">
        <EndReached>
          This page does not exist.
          <Link
            to="/"
            className="block text-lg pt-3 text-accent font-medium cursor-pointer hover:underline"
          >
            Return home
          </Link>
        </EndReached>
      </div>
    </div>
  )
}
