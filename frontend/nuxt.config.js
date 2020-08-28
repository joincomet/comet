import redirectSSL from 'redirect-ssl'
import { sortRoutes } from '@nuxt/utils'
import {
  mdiImage,
  mdiImageOutline,
  mdiTextBox,
  mdiTextBoxOutline,
  mdiLinkBox,
  mdiLinkBoxOutline,
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronUp,
  mdiChevronDown,
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatStrikethrough,
  mdiFormatQuoteClose,
  mdiFormatListNumbered,
  mdiFormatListBulleted,
  mdiClockTimeOneOutline,
  mdiHome,
  mdiAccountOutline,
  mdiBellOutline,
  mdiPencil,
  mdiMagnify,
  mdiNewspaper,
  mdiFire,
  mdiCommentOutline,
  mdiRocket,
  mdiPlusBox,
  mdiShareOutline,
  mdiDotsVertical,
  mdiInfinity,
  mdiText,
  mdiLink,
  mdiCodeTags,
  mdiEmoticonFrown,
  mdiWeatherNight,
  mdiLogin,
  mdiLogout,
  mdiEye,
  mdiEyeOff,
  mdiTrashCan,
  mdiAlertOctagonOutline,
  mdiCogOutline,
  mdiReply,
  mdiFilterVariant,
  mdiShare,
  mdiContentCopy,
  mdiOpenInNew,
  mdiComment,
  mdiMessageReply,
  mdiWeb,
  mdiPost,
  mdiPostOutline,
  mdiDiscord,
  mdiStar,
  mdiAccountPlusOutline,
  mdiAccountCheckOutline,
  mdiAccountCancelOutline,
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiMinus,
  mdiFormatUnderline,
  mdiCodeNotEqualVariant,
  mdiClose,
  mdiCloseCircleOutline,
  mdiCloseCircle,
  mdiTelescope,
  mdiPlusBoxOutline,
  mdiLinkOff,
  mdiAccountMultiple,
  mdiAccountMultipleOutline,
  mdiCommentMultiple,
  mdiCommentMultipleOutline,
  mdiShuffleVariant,
  mdiFace,
  mdiPlus,
  mdiCheck,
  mdiClipboardAccount,
  mdiNewspaperPlus,
  mdiNewspaperMinus,
  mdiTrendingUp,
  mdiCheckCircleOutline,
  mdiCheckAll,
  mdiMusic,
  mdiEarth,
  mdiEarthPlus,
  mdiControllerClassic,
  mdiCamera,
  mdiEmoticonExcited,
  mdiMovie,
  mdiPill,
  mdiWeightLifter,
  mdiCommentTextMultiple,
  mdiDevices,
  mdiCashUsdOutline,
  mdiNaturePeople,
  mdiBasketball,
  mdiFood,
  mdiMicroscope,
  mdiFeather,
  mdiImageFrame,
  mdiSchool,
  mdiBookshelf,
  mdiTshirtCrew,
  mdiCity,
  mdiHelpCircle,
  mdiArrowLeft,
  mdiEmailOutline,
  mdiArrowExpand,
  mdiArrowCollapse,
  mdiDogSide,
  mdiVideoOutline,
  mdiMicrophoneVariant,
  mdiInformation,
  mdiInformationOutline,
  mdiHeadLightbulb,
  mdiHeadLightbulbOutline,
  mdiFormatSize,
  mdiStarOutline,
  mdiPencilOutline,
  mdiEarthOff,
  mdiShieldOutline,
  mdiShield,
  mdiWeatherHurricane,
  mdiArrowRightThinCircleOutline,
  mdiCloseThick,
  mdiPin
} from '@mdi/js'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s / Comet',
    title: 'Comet',
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#202124' },
      {
        hid: 'description',
        name: 'description',
        content: 'Explore Planets, posts, and comments on Comet'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Explore Planets, posts, and comments on Comet'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Comet'
      },
      {
        name: 'og:image',
        hid: 'og:image',
        content: 'https://www.getcomet.net/comet_og_image.png'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `https://www.getcomet.net`
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: `getcomet.net`
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
        content: 'Comet'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Explore Planets, posts, and comments on Comet'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.getcomet.net/comet_og_image.png'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: `https://www.getcomet.net`
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

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    progress: false,
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://api:4000'
        : 'http://api:4000',
    browserBaseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.cometx.io'
        : 'http://localhost:4000'
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

  /*
   ** Apollo module configuration
   ** See https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    cookieAttributes: {
      expires: 7,
      secure: process.env.NODE_ENV === 'production'
    },
    clientConfigs: {
      default: {
        httpEndpoint:
          process.env.NODE_ENV === 'production'
            ? 'http://api:4000/graphql'
            : 'http://api:4000/graphql',
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

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
      values: {
        mdiImage,
        mdiImageOutline,
        mdiTextBox,
        mdiTextBoxOutline,
        mdiLinkBox,
        mdiLinkBoxOutline,
        mdiChevronLeft,
        mdiChevronRight,
        mdiChevronUp,
        mdiChevronDown,
        mdiFormatBold,
        mdiFormatItalic,
        mdiFormatStrikethrough,
        mdiFormatQuoteClose,
        mdiFormatListNumbered,
        mdiFormatListBulleted,
        mdiClockTimeOneOutline,
        mdiHome,
        mdiAccountOutline,
        mdiBellOutline,
        mdiPencil,
        mdiMagnify,
        mdiNewspaper,
        mdiFire,
        mdiCommentOutline,
        mdiRocket,
        mdiPlusBox,
        mdiShareOutline,
        mdiDotsVertical,
        mdiInfinity,
        mdiText,
        mdiLink,
        mdiCodeTags,
        mdiEmoticonFrown,
        mdiWeatherNight,
        mdiLogin,
        mdiLogout,
        mdiEye,
        mdiEyeOff,
        mdiTrashCan,
        mdiAlertOctagonOutline,
        mdiCogOutline,
        mdiReply,
        mdiFilterVariant,
        mdiShare,
        mdiContentCopy,
        mdiOpenInNew,
        mdiComment,
        mdiMessageReply,
        mdiWeb,
        mdiPost,
        mdiPostOutline,
        mdiDiscord,
        mdiStar,
        mdiAccountPlusOutline,
        mdiAccountCheckOutline,
        mdiAccountCancelOutline,
        mdiFormatHeader1,
        mdiFormatHeader2,
        mdiFormatHeader3,
        mdiMinus,
        mdiFormatUnderline,
        mdiCodeNotEqualVariant,
        mdiClose,
        mdiCloseCircleOutline,
        mdiCloseCircle,
        mdiTelescope,
        mdiPlusBoxOutline,
        mdiLinkOff,
        mdiAccountMultiple,
        mdiAccountMultipleOutline,
        mdiCommentMultiple,
        mdiCommentMultipleOutline,
        mdiShuffleVariant,
        mdiFace,
        mdiPlus,
        mdiCheck,
        mdiClipboardAccount,
        mdiNewspaperPlus,
        mdiNewspaperMinus,
        mdiTrendingUp,
        mdiCheckCircleOutline,
        mdiCheckAll,
        mdiMusic,
        mdiEarth,
        mdiEarthPlus,
        mdiControllerClassic,
        mdiCamera,
        mdiEmoticonExcited,
        mdiMovie,
        mdiPill,
        mdiWeightLifter,
        mdiCommentTextMultiple,
        mdiDevices,
        mdiCashUsdOutline,
        mdiNaturePeople,
        mdiBasketball,
        mdiFood,
        mdiMicroscope,
        mdiFeather,
        mdiImageFrame,
        mdiSchool,
        mdiBookshelf,
        mdiTshirtCrew,
        mdiCity,
        mdiHelpCircle,
        mdiArrowLeft,
        mdiEmailOutline,
        mdiArrowExpand,
        mdiArrowCollapse,
        mdiDogSide,
        mdiVideoOutline,
        mdiMicrophoneVariant,
        mdiInformation,
        mdiInformationOutline,
        mdiHeadLightbulb,
        mdiHeadLightbulbOutline,
        mdiFormatSize,
        mdiStarOutline,
        mdiPencilOutline,
        mdiEarthOff,
        mdiShieldOutline,
        mdiShield,
        mdiWeatherHurricane,
        mdiArrowRightThinCircleOutline,
        mdiCloseThick,
        mdiPin
      }
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

  build: {
    extend(config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.env.NODE_ENV === 'production') {
        config.externals = [{ newrelic: 'newrelic' }]
      }
    },
    loaders: {
      imgUrl: { limit: 10000 }
    },
    splitChunks: {
      pages: false,
      vendor: false,
      commons: false,
      runtime: false,
      layouts: false
    },
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    optimizeCSS: true
  },

  render: {
    static: {
      setHeaders(res) {
        res.setHeader('Cache-Control', 'public, max-age=126144000')
      }
    },
    dist: {
      setHeaders(res) {
        res.setHeader('Cache-Control', 'public, max-age=31536000')
      }
    }
  },

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
  }
}
