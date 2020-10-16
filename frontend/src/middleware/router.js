export default function({ store }) {
  store.app.router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
      store.commit('setLoginDialog', true)
      if (process.client) {
        window.history.pushState({}, null, to.path)
      }
    } else {
      next()
    }
  })
}
