<template>
  <div class="container mx-auto py-3 sm:px-3">
    <div class="text-xl font-semibold">
      {{ community.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunityPage',
  props: {
    community: {
      type: Object,
      required: true
    }
  },
  head () {
    const title = `${this.community.customName || `+${this.community.name}`} – CometX`
    return {
      title,
      link: [
        {
          rel: 'canonical',
          href: `https://www.cometx.io/+${this.community.name}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.community.profile.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.community.profile.description
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
          content: this.community.profile.avatar
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
          content: this.community.profile.avatar
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.community.profile.description
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
