<template>
  <div>
    <Popover style="height: 20px">
      <template v-slot:activator="{ on }">
        <button
          ref="btnRef"
          class="h-5 focus:outline-none"
          @click.stop.prevent="on"
        >
          <Icon class="text-gray-500" name="dots-horizontal" />
        </button>
      </template>

      <div class="listitem">
        <Icon size="16" class="mr-3" name="bookmark" />
        Save
      </div>
      <div class="text-green-600 listitem">
        <Icon size="16" class="mr-3" name="crosspost" />
        Crosspost
      </div>
      <div class="listitem text-secondary" @click="moreOptions = true">
        More Options
      </div>
    </Popover>

    <Dialog v-model="moreOptions">
      <DialogCard class="p-4">
        <div>{{ post.title }}</div>
        <div class="mt-3 text-sm rounded-lg">
          <div class="listitem">
            <Icon size="16" class="mr-3" name="eye-off" />
            Hide
          </div>
          <div class="listitem">
            <Icon size="16" class="mr-3" name="report" />
            Report
          </div>
          <div class="listitem">
            Mute @{{ post.author.username }}
          </div>
          <div class="listitem">
            Mute @{{ post.planet.name }}
          </div>

          <div class="pt-3 pb-1 pl-2 text-xs tracking-wide uppercase text-secondary">
            MOD ACTIONS
          </div>
          <div class="text-green-600 listitem">
            Pin
          </div>
          <div class="text-red-600 listitem">
            Remove
          </div>
          <div class="text-red-600 listitem">
            Ban @{{ post.author.username }} from +{{ post.planet.name }}
          </div>

          <div class="pt-3 pb-1 pl-2 text-xs tracking-wide uppercase text-secondary">
            ADMIN ACTIONS
          </div>
          <div class="text-red-600 listitem">
            Sitewide ban @{{ post.author.username }}
          </div>
          <div class="text-red-600 listitem">
            Sitewide ban @{{ post.author.username }} and purge posts
          </div>
        </div>
      </DialogCard>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/Dialog'
import DialogCard from '@/components/dialog/DialogCard'
import Icon from '@/components/Icon'
import Popover from '@/components/popover/Popover'

export default {
  name: 'PostMoreOptions',
  components: { Popover, Icon, DialogCard, Dialog },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      moreOptions: false
    }
  }
}
</script>

<style scoped>

</style>
