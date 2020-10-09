import { parse } from 'cookie'
const cookieKey = 'layout'

export default function (ctx, inject) {
  let preference = 'cards'

  // Try to read from cookies
  if (ctx.req) {
    // Check if cookie exist, otherwise TypeError: argument str must be a string
    const cookies = parse(ctx.req.headers.cookie || '')
    if (cookies[cookieKey]) {
      preference = cookies[cookieKey]
    }
  }

  const layoutMode = {
    preference,
    value: preference,
    unknown: process.static || !ctx.req
  }

  ctx.beforeNuxtRender(({ nuxtState }) => {
    nuxtState.layoutMode = layoutMode
  })

  inject('layoutMode', layoutMode)
}
