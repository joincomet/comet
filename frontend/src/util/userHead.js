export const userHead = (user) => {
  if (!user) { return { title: 'User' } } else {
    return {
      title: user.username,
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${user.username}'s profile on CometX`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: user.username
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: user.profile.banner
            ? user.profile.banner
            : 'https://www.cometx.io/og_image.png'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://www.cometx.io/u/${user.username}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: `cometx.io/u/${user.username}`
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
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: user.username
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: user.username
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `${user.username}'s profile on CometX`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: user.profile.banner
            ? user.profile.banner
            : 'https://www.cometx.io/og_image.png'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://www.cometx.io/u/${user.username}`
        }
      ]
    }
  }
}
