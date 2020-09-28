<template>
  <div>
    {{ galaxy }}
  </div>
</template>

<script>
export default {
  name: 'GalaxyPage',
  props: {
    galaxy: {
      type: Object,
      required: true
    }
  }
}
</script>
