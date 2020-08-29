import redirectSSL from 'redirect-ssl'
import { sortRoutes } from '@nuxt/utils'
import * as iconImport from './icons'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s / CometX',
    title: 'CometX',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#202124' },
      {
        hid: 'description',
        name: 'description',
        content: 'Explore Planets, posts, and comments on CometX'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Explore Planets, posts, and comments on CometX'
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
        content: `cometx.io`
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
        content: 'Explore Planets, posts, and comments on CometX'
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
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/css/main.css', '~/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/color.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@aceforth/nuxt-optimized-images'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/device',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],

  optimizedImages: {
    optimizeImages: true
  },

  pwa: {
    manifest: {
      name: 'Comet',
      short_name: 'Comet',
      description: 'Create and browse posts and comments on Comet',
      theme_color: '#202124',
      background_color: '#202124',
      fileName: 'manifest.[ext]?[hash]',
      start_url: '/'
    },
    meta: {
      name: 'Comet',
      description: 'Create and browse posts and comments on Comet',
      theme_color: '#202124',
      favicon: false,
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent'
    },
    icon: {
      purpose: ['any', 'maskable']
    }
  },

  axios: {
    progress: false,
    baseURL: process.env.BASE_URL,
    browserBaseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.BROWSER_BASE_URL
        : 'http://localhost:4000'
  },

  apollo: {
    cookieAttributes: {
      expires: 7,
      secure: process.env.NODE_ENV === 'production'
    },
    clientConfigs: {
      default: {
        httpEndpoint: `${process.env.BASE_URL}/graphql`,
        browserHttpEndpoint:
          process.env.NODE_ENV === 'production'
            ? `${process.env.BROWSER_BASE_URL}/graphql`
            : 'http://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        wsEndpoint: null
      }
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
      values: { ...iconImport }
    },
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          primary: '#5C6BC0',
          secondary: '#EF5350',
          accent: '#FF9800',
          error: '#F44336',
          success: '#43A047'
        },
        light: {
          primary: '#5C6BC0',
          secondary: '#EF5350',
          accent: '#FF9800',
          error: '#F44336',
          success: '#43A047'
        }
      }
    }
  },

  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production'
    })
  ],

  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'universe-sort-time',
          path: '/universe/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/universe.vue')
        },
        {
          name: 'p-planetname-sort-time',
          path: '/p/:planetname/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/planet.vue')
        },
        {
          name: 'p-planetname-comments-id-title',
          path: '/p/:planetname/comments/:id/:title?',
          component: resolve(__dirname, 'components/pages/post.vue')
        },
        {
          name: 'g-galaxyname-sort-time',
          path: '/g/:galaxyname/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/galaxy.vue')
        },
        {
          name: 'u-username-sort-time',
          path: '/u/:username/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/user.vue')
        },
        {
          name: 'search-sort-time',
          path: '/search/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/search.vue')
        },
        {
          name: 'home-sort-time',
          path: '/home/:sort?/:time?',
          component: resolve(__dirname, 'components/pages/home.vue')
        }
      )
      sortRoutes(routes)
    }
  },

  env: {
    EMBEDLY_KEY: process.env.EMBEDLY_KEY
  },

  build: {
    splitChunks: {
      pages: false
    }
  }
}
