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
  shallow = false,
  as,
  scroll = true,
  replace = false,
  prefetch
}) {
  const router = useRouter()

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
      >
        {children}
      </a>
    </Link>
  )
}

NavLink.defaultProps = defaultProps

export default React.memo(NavLink)
