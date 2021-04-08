import { useCallback } from 'react'
import ctl from '@netlify/classnames-template-literals'
import { IconChevrownRight } from '@/components/ui/icons/Icons'

export const useContextMenuItem = item =>
  useCallback(
    ({ onClick, arrow, red, label }) => (
      <ContextMenuItem
        item={item}
        arrow={arrow}
        onClick={onClick}
        red={red}
        label={label}
      />
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
  flex
  select-none
  cursor-pointer
  w-full
  px-2
  h-8
  flex
  items-center
  text-13
  rounded-sm
  font-medium
  focus:outline-none
  ${
    red
      ? 'text-red-500 active:bg-red-600 hover:bg-red-500 focus:bg-red-500'
      : 'text-gray-600 dark:text-gray-400 active:bg-green-700 focus:bg-green-600 hover:bg-green-600'
  } 
`
  )

function ContextMenuItem({
  item: { bindMenuItem, hideMenu },
  onClick,
  red,
  arrow,
  label
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
      {arrow && <IconChevrownRight className="w-5 h-5 ml-auto" />}
    </div>
  )
}
