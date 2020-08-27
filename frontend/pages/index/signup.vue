<template>
  <div style="display: flex; flex-direction: column;">
    <v-form ref="form" v-model="valid" @submit.prevent="signUp">
      <v-text-field
        v-model="username"
        outlined
        label="Username"
        :rules="username.length > 0 ? rules.usernameRules : []"
      />
      <v-text-field
        v-model="email"
        outlined
        label="Email (Optional)"
        :rules="email && email.length > 0 ? rules.emailRules : []"
      />
      <v-text-field
        v-model="password"
        outlined
        label="Password"
        :rules="password.length > 0 ? rules.passwordRules : []"
        :type="showPassword ? 'text' : 'password'"
      >
        <template v-slot:append>
          <div
            style="cursor: pointer;"
            tabindex="-1"
            @click="showPassword = !showPassword"
          >
            <v-icon class="text--secondary">{{
              showPassword
                ? $vuetify.icons.values.mdiEye
                : $vuetify.icons.values.mdiEyeOff
            }}</v-icon>
          </div>
        </template>
      </v-text-field>
      <v-text-field
        v-model="confirmPassword"
        outlined
        label="Confirm Password"
        :rules="confirmPassword.length > 0 ? rules.confirmPasswordRules : []"
        :type="showPassword ? 'text' : 'password'"
      >
        <template v-slot:append>
          <div
            style="cursor: pointer;"
            tabindex="-1"
            @click="showPassword = !showPassword"
          >
            <v-icon class="text--secondary">{{
              showPassword
                ? $vuetify.icons.values.mdiEye
                : $vuetify.icons.values.mdiEyeOff
            }}</v-icon>
          </div>
        </template>
      </v-text-field>
      <v-row no-gutters>
        <v-spacer />
        <v-btn text rounded class="text--secondary mr-2" nuxt to="/login"
          >Already have an account?</v-btn
        >
        <v-btn
          depressed
          rounded
          color="primary"
          :loading="loading"
          type="submit"
          :disabled="!formValid"
          >Sign Up</v-btn
        >
      </v-row>
      <div class="text--secondary pt-6" style="font-size: 0.86rem;">
        By clicking Sign Up, you agree to our
        <nuxt-link to="/terms" target="_blank" class="primary--text"
          >Terms of Service</nuxt-link
        >
        and
        <nuxt-link to="/privacy" target="_blank" class="primary--text"
          >Privacy Policy</nuxt-link
        >.
      </div>
    </v-form>
  </div>
</template>

<script>
import * as EmailValidator from 'email-validator'
import signUpGql from '@/gql/signUp.graphql'

export default {
  transition: {
    name: 'scroll-x-transition',
    mode: 'out-in'
  },
  data() {
    return {
      valid: false,
      username: '',
      email: null,
      password: '',
      confirmPassword: '',
      showPassword: false,
      loading: false,
      rules: {
        usernameRules: [
          (v) => v.length >= 3 || 'Username must be at least 3 characters',
          (v) => v.length <= 15 || 'Maximum username length is 15 characters',
          (v) =>
            (v.match(/^[a-zA-Z0-9_]+$/) &&
              v.match(/^[a-zA-Z0-9_]+$/).length > 0) ||
            'Username can only have letters, numbers, and underscores.'
        ],
        emailRules: [
          (v) => (!!v && EmailValidator.validate(v)) || 'Invalid email'
        ],
        passwordRules: [
          (v) => v.length >= 6 || 'Password must be at least 6 characters'
        ],
        confirmPasswordRules: [
          (v) => v === this.password || 'Passwords do not match'
        ]
      }
    }
  },
  computed: {
    formValid() {
      return (
        this.valid && this.username && this.password && this.confirmPassword
      )
    }
  },
  methods: {
    async signUp() {
      if (!this.formValid) return
      this.loading = true
      try {
        const res = await this.$apollo
          .mutate({
            mutation: signUpGql,
            variables: {
              username: this.username,
              password: this.password,
              email: this.email
            }
          })
          .then(({ data }) => data && data.signUp)
        await this.$apolloHelpers.onLogin(res.accessToken)
        await this.$store.dispatch('fetchCurrentUser')
        await this.$router.push('/home')
        if (this.$vuetify.breakpoint.lgAndUp) {
          this.$store.commit('setNav', true)
        }
      } catch (e) {
        this.err = e.message
        this.$store.dispatch('displaySnackbar', {
          message: this.err.split('GraphQL error: ')[1]
        })
      }
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
