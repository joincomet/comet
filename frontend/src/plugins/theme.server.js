import { parse } from 'cookie'
const cookieKey = 'theme'

export default function (ctx, inject) {
  let preference = 'system'

  // Try to read from cookies
  if (ctx.req) {
    // Check if cookie exist, otherwise TypeError: argument str must be a string
    const cookies = parse(ctx.req.headers.cookie || '')
    if (cookies[cookieKey]) {
      preference = cookies[cookieKey]
    }
  }

  const colorMode = {
    preference,
    value: preference,
    unknown: process.static || !ctx.req || preference === 'system'
  }

  ctx.beforeNuxtRender(({ nuxtState }) => {
    nuxtState.colorMode = colorMode
  })

  inject('colorMode', colorMode)
}
