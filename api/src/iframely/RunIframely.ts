import { IframelyResponse } from '@/iframely/IframelyResponse'

const _ = require('lodash')
const mkdirp = require('mkdirp')
const fs = require('fs-extra')

const MACOS_CHROME_USERAGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3669.0 Safari/537.36'

const iframelyConfig = {
  // Disable logging to iframely server
  WHITELIST_LOG_URL: null,

  CACHE_ENGINE: 'no-cache',

  USER_AGENT: MACOS_CHROME_USERAGENT,
  WHITELIST_DIR: 'whitelist',
  GROUP_LINKS: true,
  RESPONSE_TIMEOUT: 5 * 1000,
  DEBUG: false,
  RICH_LOG_ENABLED: true
}

// Monkey-patch the config object
// @ts-ignore
global.CONFIG = _.extend({}, require('iframely/config'), iframelyConfig)
const wl = require('iframely/lib/whitelist')

// Load iframely whitelist offline
mkdirp.sync('node_modules/iframely/whitelist')

fs.copySync(
  './iframely-whitelist.json',
  'node_modules/iframely/whitelist/iframely-whitelist.json',
  { overwrite: false }
)

const iframely = require('iframely')

export const runIframely = (url: string): Promise<IframelyResponse> => {
  return new Promise(resolve => {
    // console.log(url)
    iframely.run(
      url,
      { v: 1.3, getWhitelistRecord: wl.findWhitelistRecordFor },
      function (err, res) {
        if (err || !res) {
          resolve(null)
          return
        }

        const REL_GROUPS = [
          'promo',
          'app',
          'player',
          'survey',
          'summary',
          'image',
          'reader',
          'thumbnail',
          'logo',
          'icon',
          'file'
        ]

        const links = res.links
        const groups: any = {}

        REL_GROUPS.forEach(function (rel) {
          const l = links.filter(function (link) {
            return link.rel.indexOf(rel) > -1
          })
          if (l.length > 0) {
            groups[rel] = l
          }
        })

        const other = links.filter(function (link) {
          return _.intersection(link.rel, REL_GROUPS).length == 0
        })
        if (other.length) {
          groups.other = other
        }
        res.links = groups

        if (res.meta && res.meta['theme-color']) {
          res.meta.themeColor = res.meta['theme-color']
          delete res.meta['theme-color']
        }
        if (res.meta && res.meta['author_url']) {
          res.meta.authorURL = res.meta['author_url']
          delete res.meta['author_url']
        }

        let { thumbnail, icon, player } = res.links

        if (player) {
          player = [player].flat()
          for (const p of player) {
            if (p.media && p.media['aspect-ratio']) {
              p.media.aspectRatio = p.media['aspect-ratio']
              delete p.media['aspect-ratio']
            }
          }
          res.links.player = player
        }

        if (icon) {
          icon = [icon].flat()
          res.links.icon = icon
        }

        if (thumbnail) {
          thumbnail = [thumbnail].flat()
          res.links.thumbnail = thumbnail
        }

        resolve(res as IframelyResponse)
      }
    )
  })
}
