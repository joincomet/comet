import { urlName } from '@/util/urlName'

export const postHead = (post) => {
  if (!post) return { title: 'Post' }
  else
    return {
      title: post.title,
      link: [
        {
          rel: 'canonical',
          href: `https://www.getcomet.net/p/${post.planet.name}/comments/${
            post.id
          }/${urlName(post.title)}`
        }
      ],
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'og:article:author',
          property: 'og:article:author',
          content: post.author.username
        },
        {
          hid: 'og:article:section',
          property: 'og:article:section',
          content: post.planet.name
        },
        {
          hid: 'og:article:published_time',
          property: 'og:article:published_time',
          content: post.createdAt
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: post.textContent ? post.textContent : ''
        },
        {
          hid: 'og:author',
          property: 'og:author',
          content: post.author.username
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: post.title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            post.type === 'IMAGE' && post.link.startsWith('https://')
              ? post.link
              : 'https://www.getcomet.net/comet_og_image.png'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://www.getcomet.net/p/${post.planet.name}/comments/${
            post.id
          }/${urlName(post.title)}`
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: `getcomet.net/p/${post.planet.name}`
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
          content: post.title
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: post.author.username
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: post.textContent ? post.textContent : ''
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content:
            post.type === 'IMAGE' && post.link.startsWith('https://')
              ? post.link
              : 'https://www.getcomet.net/comet_og_image.png'
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://www.getcomet.net/p/${post.planet.name}/comments/${
            post.id
          }/${urlName(post.title)}`
        }
      ]
    }
}
