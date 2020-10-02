export const communityHead = (community) => {
  if (!community) { return { title: 'community' } } else {
    return {
      title: community.customName ? community.customName : community.name,
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: community.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: community.customName ? community.customName : community.name
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: community.profile.banner
            ? community.profile.banner
            : 'https://www.cometx.io/og_image.png'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://www.cometx.io/+${community.name}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: `cometx.io/+${community.name}`
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@CometWebsite'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: community.customName ? community.customName : community.name
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: community.description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: community.profile.banner
            ? community.profile.banner
            : 'https://www.cometx.io/og_image.png'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://www.cometx.io/+${community.name}`
        }
      ]
    }
  }
}
