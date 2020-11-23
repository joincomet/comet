import { RiFireLine } from 'react-icons/ri'
import { FiClock } from 'react-icons/fi'
import Dropdown from '@/components/Dropdown'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'

export default function SortDropdown() {
  const router = useRouter()

  const getVariables = query => {
    const sort =
      query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
    const time =
      query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
    return { sort, time }
  }

  const { sort, time } = getVariables(router.query)

  return (
    <Dropdown
      button={
        <div className="h-10 px-8 inline-flex items-center cursor-pointer text-sm text-blue-500 transition duration-150 ease-in-out">
          <RiFireLine className="w-4 h-4 mr-4" />
          {sort.charAt(0).toUpperCase() + sort.substring(1).toLowerCase()}
        </div>
      }
    >
      <div className="rounded shadow-md bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-secondary">
        <NavLink
          href={{ query: { sort: ['hot'] } }}
          className="h-10 pl-8 flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out"
        >
          <RiFireLine className="w-4 h-4 mr-4" />
          Hot
        </NavLink>

        <NavLink
          href={{ query: { sort: ['new'] } }}
          className="h-10 pl-8 flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out"
        >
          <FiClock className="w-4 h-4 mr-4" />
          New
        </NavLink>
      </div>
    </Dropdown>
  )
}
