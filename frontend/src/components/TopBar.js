import SearchBar from './SearchBar'

export default function TopBar() {
  return (
    <div>
      <nav className="fixed z-10 top-0 inset-x-0 w-full h-16 bg-white shadow-md">
        <div className="page h-full">
          <div className="container mx-auto 2xl:px-80 flex items-center flex-grow h-full">
            <SearchBar />
          </div>
        </div>
      </nav>

      <style jsx>{`
        @media (min-width: 640px) {
          .page {
            margin-left: 17.5rem;
            margin-right: 17.5rem;
          }
        }

        .page {
          @apply flex flex-grow;
        }
      `}</style>
    </div>
  )
}
