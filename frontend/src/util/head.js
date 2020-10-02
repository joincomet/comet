export const head = (title, description, canonicalLink, banner, avatar, username, type, community) => {
  const head = {
    title,
    link: [
      {
        rel: 'canonical',
        href: `https://www.cometx.io${canonicalLink}`
      }
    ],
    meta: [
      {
        hid: 'og:type',
        property: 'og:type',
        content: type
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
      } : undefined

    ]
  }

  return head
}
