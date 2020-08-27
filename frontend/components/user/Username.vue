<template>
  <span @click="handleClick">
    <nuxt-link :to="`/u/${user.username}`" class="text--secondary" event="">
      <v-avatar size="20">
        <img
          loading="lazy"
          alt="Profile picture"
          :src="user.profilePicUrl"
          style="object-fit: cover;"
        />
      </v-avatar>
      <span
        class="ml-1"
        style="font-size: 0.86rem;"
        :class="op && user.username !== 'Comet' ? 'font-weight-bold' : ''"
      >
        {{ user.username }}
      </span>
      <v-icon
        v-if="op && user.username !== 'Comet'"
        size="16"
        style="padding-bottom: 3px;"
        color="primary"
        title="Original Poster"
        >{{ $vuetify.icons.values.mdiMicrophoneVariant }}</v-icon
      >
      <v-chip
        v-if="user.tag"
        dark
        x-small
        label
        :color="user.tagColor"
        class="ml-1 px-2"
        >{{ user.tag }}</v-chip
      >
    </nuxt-link>
  </span>
</template>

<script>
export default {
  name: 'Username',
  props: {
    user: {
      type: Object,
      required: true
    },
    link: {
      type: Boolean,
      default: true
    },
    op: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      if (this.$device.isDesktop) {
        e.stopPropagation()
        e.preventDefault()
        this.$router.push(`/u/${this.user.username}`)
      }
    }
  }
}
</script>

<style scoped></style>
