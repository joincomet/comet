import { useCallback } from 'react'
import ctl from '@netlify/classnames-template-literals'
import { IconChevronRight } from '@/components/ui/icons/Icons'

export const useContextMenuItem = item =>
  useCallback(
    ({ onClick, red, label, checked, children }) => (
      <ContextMenuItem
        item={item}
        onClick={onClick}
        red={red}
        label={label}
        checked={checked}
      >
        {children}
      </ContextMenuItem>
    ),
    [item]
  )

const itemClass = red =>
  ctl(
    `
  active:text-white
  dark:active:text-white
  dark:hover:text-white
  dark:focus:text-white
  hover:text-white
  select-none
  cursor-pointer
  w-full
  px-2
  py-1.5
  leading-5
  flex
  items-center
  text-13
  rounded-sm
  font-medium
  focus:outline-none
  group
  relative
  ${
    red
      ? 'text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500'
      : 'text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600'
  } 
`
  )

function ContextMenuItem({
  item: { bindMenuItem, hideMenu, isRight },
  onClick,
  red,
  checked = null,
  label,
  children
}) {
  return (
    <div
      {...bindMenuItem}
      className={itemClass(red)}
      onClick={e => {
        hideMenu()
        if (onClick) onClick(e)
      }}
    >
      {label}
      {checked !== null && (
        <input
          type="checkbox"
          className="ml-auto h-4 w-4 border-none rounded dark:checked:bg-green-600 dark:bg-gray-750 focus:outline-none cursor-pointer"
          checked={checked}
          readOnly
        />
      )}

      {children && (
        <>
          <div className="ml-auto">
            <IconChevronRight className="w-5 h-5 -mr-0.5" />
          </div>

          <div
            className={`absolute -top-2 hidden group-hover:block ${
              isRight ? 'right-full -mr-2' : 'left-full -ml-2'
            }`}
          >
            <div className={`${isRight ? 'pr-2' : 'pl-2'}`}>
              <div
                className={`${
                  isRight ? 'mr-3' : 'ml-3'
                } p-2 dark:bg-gray-900 rounded w-48 shadow-lg`}
              >
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
