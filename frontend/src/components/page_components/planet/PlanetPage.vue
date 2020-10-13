<template>
  <div class="container mx-auto py-3 sm:px-3">
    <div class="text-xl font-semibold">
      {{ planet.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanetPage',
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  head() {
    const title = `${this.planet.customName || `+${this.planet.name}`} – CometX`
    return {
      title,
      link: [
        {
          rel: 'canonical',
          href: `https://www.cometx.io/+${this.planet.name}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.planet.profile.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.planet.profile.description
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'CometX'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.planet.profile.avatar
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@CometWebsite'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.planet.profile.avatar
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.planet.profile.description
        },
        this.user.profile.twitter ? {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: `@${this.user.profile.twitter}`
        } : undefined
      ]
    }
  }
}
</script>

<style scoped>

</style>
