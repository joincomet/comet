import { sortRoutes } from '@nuxt/utils'

export default {
  srcDir: 'src/',
  components: true,

  head: {
    titleTemplate: '%s',
    title: "CometX – See what's in orbit.",
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'description',
        name: 'description',
        content: 'Explore communities, posts, and comments on CometX'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Explore communities, posts, and comments on CometX'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'CometX'
      },
      {
        name: 'og:image',
        hid: 'og:image',
        content: 'https://www.cometx.io/og_image.png'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.cometx.io'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'cometx.io'
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
        content: 'CometX'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Explore communitys, posts, and comments on CometX'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.cometx.io/og_image.png'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.cometx.io'
      }
    ]
  },

  loading: { color: '#fff' },

  buildModules: [
    '~/modules/theme',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/device',
    '@nuxt/content'
  ],

  eslint: {
    cache: true
  },

  tailwindcss: {
    // add '~tailwind.config` alias - increases bundle size
    exposeConfig: true,
    configPath: '~~/tailwind.config.js'
  },

  css: ['@/assets/css/inter/inter.css', '@/assets/css/toast/themes/sugar/index.scss'],

  plugins: ['@/plugins/toast.client.js', '@/plugins/theme.client.js', '@/plugins/theme.server.js'],

  pwa: {
    manifest: {
      name: 'CometX',
      short_name: 'CometX',
      description: "See what's in orbit.",
      theme_color: '#202124',
      background_color: '#202124',
      fileName: 'manifest.[ext]?[hash]',
      start_url: '/'
    },
    meta: {
      name: 'CometX',
      description: "See what's in orbit.",
      theme_color: '#202124',
      favicon: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent'
    }
  },

  apollo: {
    cookieAttributes: {
      expires: 7,
      secure: process.env.NODE_ENV === 'production'
    },
    clientConfigs: {
      default: {
        httpEndpoint: 'http://api:4000/graphql',
        browserHttpEndpoint:
          process.env.NODE_ENV === 'production'
            ? 'https://api.cometx.io/graphql'
            : 'http://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        wsEndpoint: null
      }
    }
  },

  build: {
    cache: process.env.NODE_ENV !== 'production',
    parallel: process.env.NODE_ENV !== 'production',
    hardSource: process.env.NODE_ENV !== 'production'
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push(
        {
          name: 'user',
          path: '/@:name',
          component: resolve(__dirname, 'src/pages/-user.vue')
        },
        {
          name: 'community',
          path: '/+:name',
          component: resolve(__dirname, 'src/pages/-community.vue')
        },
        {
          name: 'tag',
          path: '/~:name',
          component: resolve(__dirname, 'src/pages/-tag.vue')
        }
      )
      sortRoutes(routes)
    }
  }
}
