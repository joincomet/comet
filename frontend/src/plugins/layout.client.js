import Vue from 'vue'
import { serialize } from 'cookie'

const cookieKey = 'layout'
const cookieOptions = {
  path: '/',
  sameSite: 'lax'
}
const layoutMode = window.__NUXT_LAYOUT_MODE__

export default function (ctx, inject) {
  let data = ctx.nuxtState.layoutMode
  // For SPA mode or fallback
  if (!data) {
    data = {
      preference: layoutMode.preference,
      value: layoutMode.value,
      unknown: false
    }
  }
  const $layoutMode = new Vue({
    data,
    watch: {
      preference (preference) {
        this.value = preference

        this._storePreference(preference)
      }
      /* value (newValue, oldValue) {
        layoutMode.removeClass(oldValue)
        layoutMode.addClass(newValue)
      } */
    },
    beforeMount () {
      if (window.localStorage) {
        this._watchStorageChange()
      }
    },
    methods: {
      _watchStorageChange () {
        window.addEventListener('storage', (e) => {
          if (e.key === cookieKey) {
            this.preference = e.newValue
          }
        })
      },
      _storePreference (preference) {
        // Cookies for SSR
        document.cookie = serialize(cookieKey, preference, cookieOptions)

        // Local storage to sync with other tabs
        if (window.localStorage) {
          window.localStorage.setItem(cookieKey, preference)
        }
      }
    }
  })

  if ($layoutMode.unknown) {
    window.onNuxtReady(() => {
      $layoutMode.preference = layoutMode.preference
      $layoutMode.value = layoutMode.value
      $layoutMode.unknown = false
    })
  }
  inject('layoutMode', $layoutMode)
}
