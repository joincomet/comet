export const head = (title, description, canonicalLink, banner, avatar, username, type, community, time) => {
  return {
    title,
    link: [
      {
        rel: 'canonical',
        href: `https://www.cometx.io${canonicalLink}`
      }
    ],
    meta: [
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'CometX'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: type
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      username && type === 'article' ? {
        hid: 'og:article:author',
        property: 'og:article:author',
        content: username
      } : undefined,
      community && type === 'article' ? {
        hid: 'og:article:section',
        property: 'og:article:section',
        content: community
      } : undefined,
      time ? {
        hid: 'og:article:published_time',
        property: 'og:article:published_time',
        content: time
      } : undefined,
      username && type === 'profile' ? {
        hid: 'og:profile:username',
        property: 'og:profile:username',
        content: username
      } : undefined
    ]
  }
}
