<template>
  <div>
    <v-fade-transition hide-on-leave>
      <v-list v-show="!selectingTime">
        <v-list-item @click="chooseHot">
          <v-list-item-icon>
            <v-icon>{{ $vuetify.icons.values.mdiFire }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :class="
                !$route.params.sort || $route.params.sort === 'hot'
                  ? 'font-weight-bold'
                  : ''
              "
              >Hot</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTop">
          <v-list-item-icon>
            <v-icon>{{ $vuetify.icons.values.mdiFormatListNumbered }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :class="$route.params.sort === 'top' ? 'font-weight-bold' : ''"
              >Top</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseNew">
          <v-list-item-icon>
            <v-icon>{{ $vuetify.icons.values.mdiClockTimeOneOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :class="$route.params.sort === 'new' ? 'font-weight-bold' : ''"
              >New</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseComments">
          <v-list-item-icon>
            <v-icon>{{
              $vuetify.icons.values.mdiCommentMultipleOutline
            }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              :class="
                $route.params.sort === 'mostcomments' ? 'font-weight-bold' : ''
              "
              >Most Comments</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-list>
          <TypeMenuContent />
        </v-list>
      </v-list>
    </v-fade-transition>

    <v-fade-transition hide-on-leave>
      <v-list v-show="selectingTime">
        <v-list-item @click="chooseTime('hour')">
          <v-list-item-action>
            <v-radio-group v-model="hour">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Hour</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTime('day')">
          <v-list-item-action>
            <v-radio-group v-model="day">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTime('week')">
          <v-list-item-action>
            <v-radio-group v-model="week">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTime('month')">
          <v-list-item-action>
            <v-radio-group v-model="month">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTime('year')">
          <v-list-item-action>
            <v-radio-group v-model="year">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Year</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="chooseTime('all')">
          <v-list-item-action>
            <v-radio-group v-model="allTime">
              <v-radio value="yes" readonly />
            </v-radio-group>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>All Time</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-fade-transition>
  </div>
</template>

<script>
import TypeMenuContent from '../type/TypeMenuContent'
export default {
  name: 'SortMenuContent',
  components: { TypeMenuContent },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectingTime: false,
      sort: ''
    }
  },
  computed: {
    allTime() {
      return this.$route.params.time === 'all' ? 'yes' : null
    },
    hour() {
      return this.$route.params.time === 'hour' ? 'yes' : null
    },
    day() {
      return this.$route.params.time === 'day' ? 'yes' : null
    },
    week() {
      return this.$route.params.time === 'week' ? 'yes' : null
    },
    month() {
      return this.$route.params.time === 'month' ? 'yes' : null
    },
    year() {
      return this.$route.params.time === 'year' ? 'yes' : null
    }
  },
  watch: {
    open(open) {
      if (!open) this.cancelSelectingTime()
    }
  },
  methods: {
    chooseHot() {
      this.$emit('selected')
      try {
        this.$router.push({
          params: { ...this.$route.params, sort: 'hot' }
        })
      } catch (e) {}
    },
    chooseNew() {
      this.$emit('selected')
      try {
        this.$router.push({
          params: { ...this.$route.params, sort: 'new' }
        })
      } catch (e) {}
    },
    chooseTop() {
      this.selectingTime = true
      this.sort = 'top'
    },
    chooseComments() {
      this.selectingTime = true
      this.sort = 'mostcomments'
    },
    chooseTime(time) {
      this.$emit('selected')
      this.cancelSelectingTime()
      try {
        this.$router.push({
          params: { ...this.$route.params, sort: this.sort, time }
        })
      } catch (e) {}
    },
    cancelSelectingTime() {
      setTimeout(() => (this.selectingTime = false), 500)
    }
  }
}
</script>

<style scoped></style>
