export const feedVars = (route) => {
  const { params, query } = route
  return {
    sort: params.sort ? params.sort.toUpperCase() : 'HOT',
    time: params.time ? params.time.toUpperCase() : 'ALL',
    filter: route.name.startsWith('home-sort-time') ? 'MYcommunityS' : 'ALL',
    types:
      query && query.types
        ? query.types.split('-').map(t => t.toUpperCase())
        : [],
    communityName: params.communityname,
    galaxyName: params.galaxyname,
    username: params.username,
    search: query.q
  }
}
