import SearchBar from './SearchBar'

export default function TopBar() {
  return (
    <div>
      <nav className="fixed inset-x-0 top-0 z-10 w-full h-16 bg-white dark:bg-gray-700 shadow-md">
        <div className="h-full page">
          <div className="container flex items-center flex-grow h-full mx-auto 2xl:px-80">
            <SearchBar className="shadow w-full h-10 text-sm rounded-full dark:bg-gray-800 outline-none transition duration-200 ease-in-out border border-gray-300 dark:border-gray-800 focus:border-blue-500" />
          </div>
        </div>
      </nav>
    </div>
  )
}
