import { forwardRef, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'

export default forwardRef(
  (
    { server, loading = 'eager', size = 12, className = '', style = {} },
    ref
  ) => {
    const initials = (server?.displayName ?? '')
      .split(' ')
      .map(s => s[0])
      .join('')
      .toUpperCase()
    const fontSize = useMemo(() => {
      const i = initials
      if (i.length <= 2) return '18px'
      if (i.length === 3) return '16px'
      if (i.length === 4) return '14px'
      if (i.length === 5) return '12px'
      if (i.length >= 6) return '10px'
    }, [initials])

    if (!server) return null
    return (
      <Avatar
        ref={ref}
        avatarUrl={server.avatarUrl}
        loading={loading}
        className={`${className} cursor-pointer`}
        size={size}
        style={style}
      >
        {!server.avatarUrl && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
            className="absolute top-0 left-0"
            overflow="visible"
          >
            <defs>
              <g>
                <path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" />
              </g>
              <g>
                <rect
                  x="28"
                  y="-4"
                  width="24"
                  height="24"
                  rx="12"
                  ry="12"
                  transform="translate(20 -20)"
                />
              </g>
              <g>
                <rect
                  x="28"
                  y="28"
                  width="24"
                  height="24"
                  rx="12"
                  ry="12"
                  transform="translate(20 20)"
                />
              </g>
            </defs>
            <foreignObject x="0" y="0" width="48" height="48">
              <div
                className="flex items-center justify-center h-full"
                tabIndex="-1"
                aria-label={server.name}
                style={{ fontSize }}
              >
                <div
                  className="flex items-center justify-center whitespace-nowrap font-medium text-tertiary"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              </div>
            </foreignObject>
          </svg>
        )}
      </Avatar>
    )
  }
)
