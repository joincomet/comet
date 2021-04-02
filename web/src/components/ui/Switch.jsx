export default function Switch({ checked, onChange, children }) {
  return (
    <Switch.Group as="div" className="w-full flex items-center space-x-3">
      <Switch.Label className="uppercase text-11 font-semibold tracking-widest text-tertiary select-none">
        {children}
      </Switch.Label>

      <Switch
        as="button"
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? 'bg-green-600' : 'dark:bg-gray-800'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked
                ? 'translate-x-5 dark:bg-green-900'
                : 'translate-x-0 dark:bg-gray-400'
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  )
}
