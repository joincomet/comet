import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import SortMenu from "./SortMenu";

export default function SearchBar() {
  let [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="flex items-center flex-grow px-3 sm:px-0">
      <div className="relative inline-flex flex-grow h-10 mr-5">
        <button type="submit" className="absolute top-0 left-0 mt-3 ml-4 mr-4 focus:outline-none">
          <FiSearch className={`transition duration-150 ease-in-out ${searchFocused ? 'text-indigo-600' : 'text-tertiary'}`} width={18} height={18} />
        </button>
        <input
          type="text"
          placeholder="Search posts, @users and +planets"
          className="w-full h-10 pl-12 pr-6 text-sm transition duration-150 ease-in-out border border-gray-100 rounded-full shadow focus:border-indigo-600 text-tertiary focus:outline-none"
          onFocus={() => setSearchFocused(!searchFocused)}
        />
      </div>

      <SortMenu />
    </div>
  )
}
