// import { sortRoutes } from '@nuxt/utils'

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
        content: 'Explore planets, posts, and comments on CometX'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Explore planets, posts, and comments on CometX'
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
        content: 'Explore planets, posts, and comments on CometX'
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
    /* '~/modules/theme', */
    '~/modules/layout',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-',
      dev: false
    }]
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/device',
    '@nuxt/content',
    '@nuxtjs/toast'
  ],

  eslint: {
    cache: true
    // emitError: false,
    // emitWarning: false
  },

  tailwindcss: {
    // add '~tailwind.config` alias - increases bundle size
    exposeConfig: true,
    configPath: '~~/tailwind.config.js'
  },

  css: ['@/assets/css/inter/inter.css'],

  plugins: ['@/plugins/layout.client.js', '@/plugins/layout.server.js', '@/plugins/iconify.js'],

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
    middleware: 'router',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'universe',
          path: '/universe/:sort?/:time?',
          component: resolve(__dirname, 'src/pages/-universe.vue')
        },
        {
          name: 'planet-settings',
          path: '/\+:planet/settings',
          component: resolve(__dirname, 'src/pages/-planet/-settings.vue')
        },
        {
          name: 'planet-post',
          path: '/\+:planet/post/:id/:title?',
          component: resolve(__dirname, 'src/pages/-planet/-post.vue')
        },
        {
          name: 'planet',
          path: '/\+:planet/:sort?/:time?',
          component: resolve(__dirname, 'src/pages/-planet.vue')
        },
        {
          name: 'user',
          path: '/\@:username/:tab?',
          component: resolve(__dirname, 'src/pages/-user.vue')
        },
        {
          name: 'tag',
          path: '/\~:tag/:sort?/:time?',
          component: resolve(__dirname, 'src/pages/-tag.vue')
        },
        {
          name: 'home',
          path: '/:sort?/:time?',
          component: resolve(__dirname, 'src/pages/-home.vue')
        }
      )
      // sortRoutes(routes)
    }
  }
}
