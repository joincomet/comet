export default function HeaderTab({
  currentPage,
  setCurrentPage,
  page,
  green = false,
  children
}) {
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`text-base font-medium rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none ${
        page === currentPage
          ? !green
            ? 'text-secondary dark:bg-gray-700 bg-gray-200'
            : 'text-green-600 bg-green-900'
          : !green
          ? 'text-tertiary'
          : 'text-secondary bg-green-600'
      }`}
    >
      {children ? children : page}
    </button>
  )
}
