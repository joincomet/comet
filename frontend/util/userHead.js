export const userHead = (user) => {
  if (!user) return { title: 'User' }
  else
    return {
      title: user.username,
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: `${user.username}'s profile on Comet`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: user.username
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: user.bannerImageUrl
            ? user.bannerImageUrl
            : 'https://www.getcomet.net/comet_og_image.png'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://www.getcomet.net/u/${user.username}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: `getcomet.net/u/${user.username}`
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
          content: `${user.username}'s profile on Comet`
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: user.bannerImageUrl
            ? user.bannerImageUrl
            : 'https://www.getcomet.net/comet_og_image.png'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://www.getcomet.net/u/${user.username}`
        }
      ]
    }
}
