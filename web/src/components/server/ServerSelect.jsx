import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export default function ServerSelect() {
  const servers = []
  const [selectedServer, setSelectedServer] = useState(servers[0])

  return (
    <Listbox value={selectedServer} onChange={setSelectedServer}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`relative w-full py-2 pl-3 pr-10 text-left bg-transparent border dark:border-gray-700 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          >
            <span className="flex items-center">
              <span className="block ml-3 truncate">{selectedServer.name}</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          {/* Use the Transition + open render prop argument to add transitions. */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options
              static
              className="py-1 overflow-auto text-base rounded-md shadow-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {servers.map(server => (
                <Listbox.Option
                  key={server.id}
                  value={server}
                  className={`relative py-2 pl-6 text-primary dark:hover:bg-gray-775 dark:bg-gray-700 flex items-center transition cursor-pointer focus:outline-none select-none`}
                >
                  {selectedServer.id === server.id ? (
                    <>{selectedServer.name}</>
                  ) : (
                    server.name
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  )
}
