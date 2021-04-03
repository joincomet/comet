import { Switch as HeadlessSwitch } from '@headlessui/react'

export default function Switch({ checked, onChange, children, green = false }) {
  return (
    <HeadlessSwitch.Group
      as="div"
      className="w-full flex items-center space-x-3"
    >
      <HeadlessSwitch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
        {children}
      </HeadlessSwitch.Label>

      <HeadlessSwitch
        as="button"
        checked={checked}
        onChange={onChange}
        className={`${
          checked
            ? `${green ? 'bg-green-600' : 'bg-blue-600'}`
            : 'dark:bg-gray-800'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked
                ? `translate-x-5 ${
                    green ? 'dark:bg-green-900' : 'dark:bg-blue-900'
                  }`
                : 'translate-x-0 dark:bg-gray-400'
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform rounded-full`}
          />
        )}
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  )
}
