import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useClickAway } from 'react-use'
import { useRouter } from 'next/router'
import { FiChevronDown } from 'react-icons/fi'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import NavLink from '@/components/NavLink'

export default function TimePicker({ item, itemActive, itemInactive }) {
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start'
  })

  const [show, setShow] = useState(false)

  const clickAwayRef = useRef(null)
  useClickAway(clickAwayRef, ({ target }) => {
    if (
      target !== referenceElement &&
      !referenceElement.contains(target) &&
      show
    )
      setShow(false)
  })

  const { query, pathname } = useRouter()

  const text = () => {
    if (!query.time) return 'Day'
    return (
      query.time.substring(0, 1).toUpperCase() +
      query.time.substring(1).toLowerCase()
    )
  }

  useEffect(() => setShow(false), [query])

  return (
    <>
      <div
        ref={setReferenceElement}
        onClick={() => setShow(!show)}
        className={`${itemActive} ${item} inline-flex items-center`}
      >
        {text()}
        <FiChevronDown className="ml-1" />
      </div>

      {ReactDOM.createPortal(
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <AnimatePresence>
            {show && (
              <motion.div
                ref={clickAwayRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="origin-top-left relative bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-xl p-3 z-50 w-32 text-sm text-secondary space-y-3 font-medium"
              >
                <NavLink
                  href={{ pathname, query: { ...query, time: 'hour' } }}
                  className={`block ${item} ${
                    query.time === 'hour' ? itemActive : itemInactive
                  }`}
                >
                  Hour
                </NavLink>
                <NavLink
                  href={{
                    pathname,
                    query: (() => {
                      const q = { ...query }
                      delete q.time
                      return q
                    })()
                  }}
                  className={`block ${item} ${
                    !query.time || query.time === 'day'
                      ? itemActive
                      : itemInactive
                  }`}
                >
                  Day
                </NavLink>
                <NavLink
                  href={{ pathname, query: { ...query, time: 'week' } }}
                  className={`block ${item} ${
                    query.time === 'week' ? itemActive : itemInactive
                  }`}
                >
                  Week
                </NavLink>
                <NavLink
                  href={{ pathname, query: { ...query, time: 'month' } }}
                  className={`block ${item} ${
                    query.time === 'month' ? itemActive : itemInactive
                  }`}
                >
                  Month
                </NavLink>
                <NavLink
                  href={{ pathname, query: { ...query, time: 'year' } }}
                  className={`block ${item} ${
                    query.time === 'year' ? itemActive : itemInactive
                  }`}
                >
                  Year
                </NavLink>
                <NavLink
                  href={{ pathname, query: { ...query, time: 'all' } }}
                  className={`block ${item} ${
                    query.time === 'all' ? itemActive : itemInactive
                  }`}
                >
                  All
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.querySelector('#timepicker')
      )}
    </>
  )
}
