import { Fragment } from 'react'
import { Transition, Dialog as HeadlessDialog } from '@headlessui/react'

export default function Dialog({ isOpen, setIsOpen, children }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <HeadlessDialog open={isOpen} onClose={setIsOpen} static>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessDialog.Overlay className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 dark:bg-black opacity-75" />
              </HeadlessDialog.Overlay>
            </Transition.Child>

            <Transition.Child
              enter="ease-out transform duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in transform duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block bg-white dark:bg-gray-750 rounded-lg p-4 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
