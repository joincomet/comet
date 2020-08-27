;(function (w, d) {
  const id = 'embedly-platform'
  const n = 'script'
  if (!d.getElementById(id)) {
    w.embedly =
      w.embedly ||
      function () {
        ;(w.embedly.q = w.embedly.q || []).push(arguments)
      }
    const e = d.createElement(n)
    e.id = id
    e.async = 1
    e.src =
      (document.location.protocol === 'https:' ? 'https' : 'http') +
      '://cdn.embedly.com/widgets/platform.js'
    const s = d.getElementsByTagName(n)[0]
    s.parentNode.insertBefore(e, s)
  }
})(window, document)

// eslint-disable-next-line no-undef
embedly('defaults', {
  key: process.env.EMBEDLY_KEY
})
