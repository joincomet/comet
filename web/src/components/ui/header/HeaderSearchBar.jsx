import toast from 'react-hot-toast'
import { IconSearch } from '@/components/ui/icons/Icons'

export default function HeaderSearchBar() {
  return (
    <div className="group relative w-full">
      <input
        onFocus={e => {
          e.target.blur()
          toast.error('Search is coming soon!')
        }}
        className="w-full block h-7 min-w-0 rounded-md dark:bg-gray-850 placeholder-tertiary text-sm focus:outline-none focus:ring-1 ring-blue-600 transition"
      />
      <IconSearch className="w-4 h-4 text-mid absolute top-1/2 transform -translate-y-1/2 left-3" />
    </div>
  )
}
