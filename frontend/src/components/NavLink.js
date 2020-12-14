import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const defaultProps = {
  activeClassName: ''
}

function NavLink({
  href,
  children,
  className,
  activeClassName,
  style = {},
  shallow = false,
  as,
  scroll = true,
  replace = false,
  prefetch
}) {
  const router = useRouter()

  if (!href)
    return (
      <a className={`${className || ''}`} style={style}>
        {children}
      </a>
    )

  return (
    <Link
      href={href}
      shallow={shallow}
      as={as}
      scroll={scroll}
      replace={replace}
      prefetch={prefetch}
    >
      <a
        className={`${className || ''}${
          router.pathname === href ? ' ' + (activeClassName || '') : ''
        }`}
        style={style}
      >
        {children}
      </a>
    </Link>
  )
}

NavLink.defaultProps = defaultProps

export default React.memo(NavLink)
