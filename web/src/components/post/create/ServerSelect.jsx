import { Fragment } from 'react'
import ctl from '@netlify/classnames-template-literals'
import { Listbox, Transition } from '@headlessui/react'
import ServerAvatar from '@/components/server/ServerAvatar'
import { IconChevronDown } from '@/components/ui/icons/Icons'

const listboxClass = ctl(`
  relative
  w-full
  h-12
  flex
  items-center
  pl-5
  pr-10
  text-left
  bg-white
  dark:bg-gray-800
  dark:hover:bg-gray-775
  cursor-pointer
  focus:outline-none
  text-sm
  rounded-none
  rounded-tl-xl
`)

const listboxOptionsClass = ctl(`
  scrollbar-dark
  absolute
  w-full
  py-1
  mt-1
  overflow-auto
  text-sm
  text-primary
  bg-white
  dark:bg-gray-775
  rounded-md
  shadow-lg
  max-h-60
  focus:outline-none
  space-y-0.5
`)

const listboxOptionClass = active =>
  ctl(`
  ${active ? 'dark:bg-gray-750' : ''}
  cursor-pointer
  select-none
  relative
  focus:outline-none
`)

export default function ServerSelect({ servers = [], server, setServer }) {
  return (
    <div className="col-span-1 z-10">
      <Listbox value={server} onChange={setServer}>
        {({ open }) => (
          <>
            <div className="relative">
              <Listbox.Button className={listboxClass}>
                {server ? (
                  <>
                    <ServerAvatar
                      server={server}
                      className="dark:bg-gray-750 rounded-full"
                      size={7}
                    />
                    <span className="block truncate pl-2">{server.name}</span>
                  </>
                ) : (
                  <span className="block truncate text-red-400">
                    Select a planet
                  </span>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <IconChevronDown
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options static className={listboxOptionsClass}>
                  {servers.map(server => (
                    <Listbox.Option
                      key={server.id}
                      className={({ active }) => listboxOptionClass(active)}
                      value={server}
                    >
                      {({ selected }) => (
                        <div
                          className={`flex items-center h-10 pl-5 pr-4 ${
                            selected ? 'dark:bg-gray-750' : ''
                          }`}
                        >
                          <ServerAvatar
                            server={server}
                            size={7}
                            className="dark:bg-gray-725 rounded-full"
                          />
                          <span
                            className={`${
                              selected ? 'font-semibold' : 'font-normal'
                            } block truncate pl-2`}
                          >
                            {server.name}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}
