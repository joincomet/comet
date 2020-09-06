<template>
  <div v-if="post.textContent" class="mt-2">
    <div
      :class="
        expand || isPostView || post.textContent.length <= 300
          ? ''
          : 'textcontent'
      "
      :style="
        expand || isPostView || post.textContent.length <= 300
          ? ''
          : 'cursor: pointer'
      "
      v-on="
        !isPostView && post.textContent.length > 300
          ? { click: toggleTextExpand }
          : {}
      "
    >
      <TextContent ref="textcontent" :text-content="post.textContent" />
    </div>
  </div>
  <div v-else-if="expand">
    <v-row
      v-if="post.type === 'IMAGE' && isEmbeddableImage"
      class="mt-4"
      no-gutters
      justify="start"
    >
      <a
        :href="post.link"
        rel="noopener nofollow noreferrer"
        target="_blank"
        @click.stop.prevent="openImageLink"
      >
        <img
          loading="lazy"
          alt="Image preview"
          :src="post.link"
          style="max-height: 500px; max-width: 100%"
        >
      </a>
    </v-row>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent'

export default {
  name: 'PostPreview',
  components: {
    TextContent
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    expand: {
      type: Boolean,
      required: true
    },
    isPostView: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isEmbeddableImage () {
      return this.post.type === 'IMAGE' && this.post.link.startsWith('https://')
    }
  },
  methods: {
    openImageLink () {
      window.open(this.post.link, '_blank')
    },
    toggleTextExpand (e) {
      this.$emit('togglemore')
      e.stopPropagation()
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
.textcontent {
  max-height: 90px;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);
  mask-image: linear-gradient(180deg, #000 60%, transparent);
}

.spotifyframe >>> iframe {
  width: 300px;
  height: 380px;
}

.youtubecontainer {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}

.youtube {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
