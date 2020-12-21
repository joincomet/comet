import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function NavLink({
  href,
  children,
  className = '',
  style = {},
  shallow = false,
  as,
  scroll = true,
  replace = false,
  prefetch,
  target = '_self'
}) {
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
      <a className={`${className}`} style={style} target={target}>
        {children}
      </a>
    </Link>
  )
}

export default React.memo(NavLink)
