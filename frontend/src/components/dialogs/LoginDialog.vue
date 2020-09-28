<template>
  <Dialog v-model="open">
    <template v-slot:activator="{ on }">
      <div class="inline-flex flex-row items-center ml-auto">
        <button
          class="px-3 py-1 mr-3 text-sm text-indigo-500 border border-indigo-500 rounded"
          @click="openLogIn(on)"
        >
          Log In
        </button>
        <button
          class="px-3 py-1 text-sm text-white bg-indigo-500 rounded"
          @click="openSignUp(on)"
        >
          Sign Up
        </button>
      </div>
    </template>

    <DialogCard>
      <div class="p-6">
        <Icon name="comet-logo" class="h-6 mb-3" />
        <!--<div class="mb-6 text-sm tracking-wide uppercase text-secondary">
          <span
            :class="{ 'font-semibold': tab === 0 }"
            class="cursor-pointer hover:underline"
            @click="tab = 0"
            >Log In</span
          >
          <span class="text-secondary">/</span>
          <span
            :class="{ 'font-semibold': tab === 1 }"
            class="cursor-pointer hover:underline"
            @click="tab = 1"
            >Sign Up</span
          >
        </div>-->
        <form v-on="tab === 0 ? { submit: logIn } : { submit: signUp }">
          <TextInput
            v-model="username"
            label="Username"
            placeholder="Username"
            error-message="Username must be 3-15 characters and use characters A-Z, 1-9, -, _"
            :error="!usernameValid && tab === 1"
          />
          <TextInput
            v-show="tab === 1"
            v-model="email"
            label="Email (Optional)"
            placeholder="Email (Optional)"
            error-message="Please enter a valid email address."
            :error="!emailValid"
          />
          <TextInput
            v-model="password"
            label="Password"
            placeholder="******************"
            error-message="Password must be at least 6 characters."
            :error="!passwordValid && tab === 1"
            type="password"
          />
          <TextInput
            v-show="tab === 1"
            v-model="confirmPassword"
            label="Confirm Password"
            placeholder="******************"
            error-message="Passwords do not match."
            :error="!confirmPasswordValid"
            type="password"
          />
          <div class="flex items-center justify-between pt-3">
            <button
              type="submit"
              :class="formValid ? 'text-white' : 'text-secondary opacity-25'"
              :disabled="!formValid"
              class="inline-flex items-center px-4 py-2 leading-6 text-gray-300 transition duration-150 ease-in-out bg-gray-300 rounded focus:outline-none dark:bg-gray-800"
            >
              <div v-show="loading" class="mr-3 -ml-1">
                <Icon name="spinner" />
              </div>
              {{ tab === 0 ? 'Log In' : 'Sign Up' }}
            </button>

            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm leading-6 transition duration-150 ease-in-out rounded text-secondary focus:outline-none"
              @click="switchTab"
            >
              {{ tab === 0 ? 'Create an account' : 'Already have an account' }}
            </button>

            <!--<a
              class="inline-block text-sm font-bold text-indigo-500 align-baseline hover:text-indigo-800"
              href="#"
            >
              Forgot Password?
            </a>-->
          </div>
          <div v-show="tab === 1" class="pt-5 text-xs text-secondary">
            By clicking Sign Up, you agree to our
            <nuxt-link to="/terms" class="text-indigo-500">
              Terms of Service
            </nuxt-link>
            and
            <nuxt-link to="/privacy" class="text-indigo-500">
              Privacy Policy
            </nuxt-link>.
          </div>
        </form>
      </div>
    </DialogCard>
  </Dialog>
</template>

<script>
import * as EmailValidator from 'email-validator'
import loginGql from '@/gql/login'
import signUpGql from '@/gql/signUp'

export default {
  name: 'LoginDialog',
  data () {
    return {
      open: false,
      tab: 0,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      loading: false
    }
  },
  computed: {
    usernameValid () {
      const u = this.username
      return (
        !u ||
        (u && u.length >= 3 && u.length <= 15 && u.match(/^[a-zA-Z0-9_]+$/))
      )
    },
    emailValid () {
      const e = this.email
      return !e || (e && EmailValidator.validate(e))
    },
    passwordValid () {
      const p = this.password
      return !p || (p && p.length >= 6)
    },
    confirmPasswordValid () {
      return !this.confirmPassword || this.password === this.confirmPassword
    },
    formValid () {
      if (this.tab === 0) {
        return this.username && this.password
      } else {
        return (
          this.username &&
          this.usernameValid &&
          this.emailValid &&
          this.password &&
          this.passwordValid &&
          this.confirmPassword &&
          this.confirmPasswordValid
        )
      }
    }
  },
  methods: {
    switchTab () {
      if (this.tab === 0) { this.tab = 1 } else { this.tab = 0 }
    },
    openLogIn (on) {
      this.tab = 0
      on()
    },
    openSignUp (on) {
      this.tab = 1
      on()
    },
    async logIn (e) {
      e.preventDefault()
      this.loading = true
      try {
        const res = await this.$apollo
          .mutate({
            mutation: loginGql,
            variables: {
              username: this.username,
              password: this.password
            }
          })
          .then(({ data }) => data && data.login)
        await this.$apolloHelpers.onLogin(res.accessToken)
        await this.$store.dispatch('fetchCurrentUser')
        this.open = false
      } catch (e) {
        this.$toast.error(e.message.split('GraphQL error: ')[1])
      }
      this.loading = false
    },
    async signUp (e) {
      e.preventDefault()
      if (!this.formValid) { return }
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
        this.open = false
      } catch (e) {
        this.$toast.error(e.message.split('GraphQL error: ')[1])
      }
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
