import { useMemo } from 'react'

export const useMessagePlaceholder = ({ channel, group, user }) =>
  useMemo(() => {
    if (channel) return `#${channel.name}`
    else if (group) return `${group.name}`
    else if (user) return `@${user.name}`
    return ``
  }, [channel, group, user])
