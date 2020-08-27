<template>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on }">
      <v-btn class="ml-1 mr-4" icon v-on="on">
        <v-icon class="text--secondary">
          {{ $vuetify.icons.values.mdiHeadLightbulbOutline }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Have an idea, feedback, or a bug? Let us know.</v-card-title
      >
      <v-card-text>
        <v-textarea
          v-model="feedback"
          hide-details
          class="darktextfield"
          solo
          flat
          label="Write something..."
          rows="3"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn text :disabled="!feedback" @click="sendFeedback">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'FeedbackDialog',
  data() {
    return {
      dialog: false,
      feedback: ''
    }
  },
  methods: {
    sendFeedback() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($feedback: String!) {
            sendFeedback(feedback: $feedback)
          }
        `,
        variables: {
          feedback: this.feedback
        }
      })
      this.dialog = false
      this.feedback = ''
      this.$store.dispatch('displaySnackbar', {
        message: 'Thanks for your feedback!',
        success: true
      })
    }
  }
}
</script>

<style scoped></style>
