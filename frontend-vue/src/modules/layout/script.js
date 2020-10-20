// Add Layout preference detection that runs before loading Nuxt.js

// Global variable minimizers
const w = window
const d = document

const preference = getCookie('layout') || 'cards'
const value = preference

w.__NUXT_LAYOUT_MODE__ = {
  preference,
  value
}

function getCookie(name) {
  const nameEQ = name + '='
  const cookies = d.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length)
    }
  }
  return null
}
