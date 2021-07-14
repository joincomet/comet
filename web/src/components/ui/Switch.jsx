import { Switch as HeadlessSwitch } from '@headlessui/react'
import { IconCheck, IconX } from '@/components/ui/icons/Icons'

export default function Switch({
  checked,
  onChange,
  children,
  green = false,
  className,
  disabled
}) {
  return (
    <HeadlessSwitch.Group as="div" className="flex items-center space-x-3">
      {children && (
        <HeadlessSwitch.Label className={className}>
          {children}
        </HeadlessSwitch.Label>
      )}

      <HeadlessSwitch
        disabled={disabled}
        as="button"
        checked={checked}
        onChange={onChange}
        className={`${
          checked
            ? `${green ? 'bg-green-600' : 'bg-blue-600'}`
            : 'dark:bg-gray-500 bg-gray-300'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-10 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? `translate-x-4` : 'translate-x-0.5'
            } bg-gray-100 inline-block relative translate-y-1px w-4.5 h-4.5 transition duration-200 ease-in-out transform rounded-full`}
          >
            <IconCheck
              className={`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${
                checked ? 'opacity-100' : 'opacity-0'
              } ${green ? 'text-green-600' : 'text-blue-600'}`}
            />
            <IconX
              className={`absolute inset-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 transition-opacity duration-200 ${
                checked ? 'opacity-0' : 'opacity-100'
              } text-gray-500`}
            />
          </span>
        )}
      </HeadlessSwitch>
    </HeadlessSwitch.Group>
  )
}
