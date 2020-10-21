import SearchBar from './SearchBar'

export default function TopBar() {
  return (
    <>
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

      <div>
        <nav className="fixed inset-x-0 top-0 z-10 w-full h-16 bg-white shadow-md">
          <div className="h-full page">
            <div className="container flex items-center flex-grow h-full mx-auto 2xl:px-80">
              <SearchBar />
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
