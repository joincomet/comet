import { useRouter } from 'next/router'

export default function usePostsVariables() {
  const { query, pathname } = useRouter()

  if (pathname === '/' || pathname === '/universe') {
    const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
    let time = query.time ? query.time.toUpperCase() : 'ALL'
    if (sort === 'TOP' && !query.time) time = 'DAY'
    return {
      sort,
      time,
      joinedOnly: pathname === '/',
      page: query.page ? parseInt(query.page) - 1 : 0
    }
  } else if (pathname === '/search') {
    const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
    let time = query.time ? query.time.toUpperCase() : 'ALL'
    if (sort === 'TOP' && !query.time) time = 'DAY'
    return {
      sort,
      time,
      joinedOnly: false,
      q: query.q || '',
      page: query.page ? parseInt(query.page) - 1 : 0
    }
  } else if (pathname === '/user/[username]') {
    const sort = query.sort ? query.sort.toUpperCase() : 'NEW'
    const time = query.time ? query.time.toUpperCase() : 'ALL'
    return {
      sort,
      time,
      username: query.username,
      page: query.page ? parseInt(query.page) - 1 : 0
    }
  } else if (pathname === '/planet/[planetname]') {
    const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
    const time = query.time ? query.time.toUpperCase() : 'ALL'
    return {
      sort,
      time,
      planet: query.planetname,
      page: query.page ? parseInt(query.page) - 1 : 0
    }
  } else if (pathname === '/galaxy/[galaxyname]') {
    const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
    const time = query.time ? query.time.toUpperCase() : 'ALL'
    return {
      sort,
      time,
      galaxy: query.galaxyname,
      page: query.page ? parseInt(query.page) - 1 : 0
    }
  }

  return undefined
}
