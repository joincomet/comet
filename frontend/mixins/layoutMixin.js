export default {
  watch: {
    '$vuetify.theme.dark'() {
      if (!process.client) return
      document.documentElement.style.backgroundColor = this.$vuetify.theme.dark
        ? '#202124'
        : '#F1F3F4'
      document.querySelector('body').style.backgroundColor = this.$vuetify.theme
        .dark
        ? '#202124'
        : '#F1F3F4'
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$vuetify.breakpoint.lgAndUp) {
        this.$store.commit('setNav', true)
      } else {
        this.$store.commit('setNav', false)
      }
    })

    const dark = localStorage.getItem('dark')
    if (dark) {
      this.$vuetify.theme.dark = dark === 'true'
    } else {
      this.$vuetify.theme.dark = true
    }

    document.documentElement.style.backgroundColor = this.$vuetify.theme.dark
      ? '#202124'
      : '#F1F3F4'
    document.querySelector('body').style.backgroundColor = this.$vuetify.theme
      .dark
      ? '#202124'
      : '#F1F3F4'
  },
  head() {
    return {
      meta: [
        {
          name: 'theme-color',
          content: this.$vuetify.theme.dark ? '#202124' : '#F1F3F4'
        }
      ]
    }
  }
}
