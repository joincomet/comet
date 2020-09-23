<template>
  <div>
    <v-sheet
      :class="$vuetify.theme.dark ? 'editor-dark' : 'editor-light'"
      :style="
        $device.isDesktop ? 'position: relative; border-radius: 10px' : ''
      "
      :outlined="!$vuetify.theme.dark"
      @click.stop.prevent="editor.focus()"
    >
      <editor-content
        :class="{
          'editor-dark__content': $vuetify.theme.dark,
          'editor-light__content': !$vuetify.theme.dark,
          'pt-3': $device.isDesktop,
          'px-3': $device.isDesktop
        }"
        :editor="editor"
        style="min-height: 148px; padding-bottom: 64px"
      />

      <editor-menu-bar
        v-slot="{ commands, isActive }"
        :editor="editor"
        style="position: absolute; bottom: 0; left: 0; right: 0"
        :style="{
          'background-color': $vuetify.theme.dark ? '#35363A' : '#F8F9FA',
          'border-top-width': '1px',
          'border-top-color': $vuetify.theme.dark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.12)',
          'border-top-style': 'solid',
          width: $device.isDesktop ? '' : '100%'
        }"
      >
        <v-row
          :class="$device.isDesktop ? 'px-3 py-1' : ''"
          class="menubar flex-grow-1 mx-0"
          :style="
            $device.isDesktop
              ? 'min-width: 100%; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px'
              : $device.isIos
                ? 'padding-bottom: 24px'
                : ''
          "
          align="center"
        >
          <button
            title="Bold"
            class="menubar__button"
            :class="{
              'is-active': isActive.bold()
            }"
            @click="commands.bold"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatBold }}</v-icon>
          </button>

          <button
            title="Italic"
            class="menubar__button"
            :class="{
              'is-active': isActive.italic()
            }"
            @click="commands.italic"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatItalic }}</v-icon>
          </button>

          <button
            title="Strikethrough"
            class="menubar__button"
            :class="{
              'is-active': isActive.strike()
            }"
            @click="commands.strike"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatStrikethrough }}</v-icon>
          </button>

          <button
            title="Underline"
            class="menubar__button"
            :class="{
              'is-active': isActive.underline()
            }"
            @click="commands.underline"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatUnderline }}</v-icon>
          </button>

          <button
            title="Code"
            class="menubar__button"
            :class="{
              'is-active': isActive.code()
            }"
            @click="commands.code"
          >
            <v-icon>{{ $vuetify.icons.values.mdiCodeTags }}</v-icon>
          </button>

          <button
            title="Heading"
            class="menubar__button"
            :class="{
              'is-active': isActive.heading({ level: 2 })
            }"
            @click="commands.heading({ level: 2 })"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatSize }}</v-icon>
          </button>

          <button
            title="Bulleted List"
            class="menubar__button"
            :class="{
              'is-active': isActive.bullet_list()
            }"
            @click="commands.bullet_list"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatListBulleted }}</v-icon>
          </button>

          <button
            title="Numbered List"
            class="menubar__button"
            :class="{
              'is-active': isActive.ordered_list()
            }"
            @click="commands.ordered_list"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatListNumbered }}</v-icon>
          </button>

          <button
            title="Quote"
            class="menubar__button"
            :class="{
              'is-active': isActive.blockquote()
            }"
            @click="commands.blockquote"
          >
            <v-icon>{{ $vuetify.icons.values.mdiFormatQuoteClose }}</v-icon>
          </button>

          <button
            title="Code Block"
            class="menubar__button"
            :class="{
              'is-active': isActive.code_block()
            }"
            @click="commands.code_block"
          >
            <v-icon>{{ $vuetify.icons.values.mdiCodeNotEqualVariant }}</v-icon>
          </button>

          <button
            title="Divider"
            class="menubar__button"
            :class="{
              'is-active': isActive.horizontal_rule()
            }"
            @click="commands.horizontal_rule"
          >
            <v-icon>{{ $vuetify.icons.values.mdiMinus }}</v-icon>
          </button>

          <button
            title="Link"
            class="menubar__button"
            :class="{ 'is-active': isActive.link() }"
            @click="showLinkPrompt(commands.link)"
          >
            <v-icon>{{ $vuetify.icons.values.mdiLink }}</v-icon>
          </button>

          <template v-if="$device.isDesktop">
            <v-btn
              v-if="showCancelBtn"
              small
              text
              @click.stop.prevent="$emit('cancelled')"
            >
              Cancel
            </v-btn>
            <v-btn
              v-if="showSubmitBtn"
              small
              depressed
              color="primary"
              class="ml-2"
              :loading="loading"
              :disabled="isEmpty"
              @click.stop.prevent="$emit('submitted')"
            >
              Submit
            </v-btn>
          </template>
        </v-row>
      </editor-menu-bar>
    </v-sheet>

    <div v-show="showSuggestions" ref="suggestions" class="suggestion-list">
      <template v-if="hasResults">
        <div
          v-for="(user, index) in filteredUsers"
          :key="user.id"
          class="suggestion-list__item"
          :class="{ 'is-selected': navigatedUserIndex === index }"
          @click="selectUser(user)"
        >
          {{ user.name }}
        </div>
      </template>
      <div v-else class="suggestion-list__item is-empty">
        No users found
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  Heading,
  OrderedList,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  HorizontalRule,
  ListItem,
  HardBreak,
  History,
  Placeholder
} from 'tiptap-extensions'
import CustomLink from '@/components/old/editor/CustomLink'
import CustomMention from '@/components/old/editor/CustomMention'
import { isEditorEmpty } from '@/util/isEditorEmpty'

export default {
  name: 'Editor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    value: {
      type: String,
      default: '<p></p>'
    },
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    showSubmitBtn: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      emitAfterOnUpdate: false,
      editor: new Editor({
        onUpdate: ({ getHTML }) => {
          this.emitAfterOnUpdate = true
          this.$emit('input', getHTML())
        },
        editable: true,
        content: this.value,
        autoFocus: true,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new Heading({ levels: [1, 2, 3] }),
          new OrderedList(),
          new CustomLink(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new HorizontalRule(),
          new ListItem(),
          new HardBreak(),
          new History(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: 'Write something...'
          }),
          new CustomMention({
            // a list of all suggested items
            items: async () => {
              await new Promise((resolve) => {
                setTimeout(resolve, 500)
              })
              return [
                { id: 1, name: 'Sven Adlung' },
                { id: 2, name: 'Patrick Baber' },
                { id: 3, name: 'Nick Hirche' },
                { id: 4, name: 'Philip Isik' },
                { id: 5, name: 'Timo Isik' },
                { id: 6, name: 'Philipp Kühn' },
                { id: 7, name: 'Hans Pagel' },
                { id: 8, name: 'Sebastian Schrama' }
              ]
            },
            // is called when a suggestion starts
            onEnter: ({ items, query, range, command, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.renderPopup(virtualNode)
              // we save the command for inserting a selected mention
              // this allows us to call it inside of our custom popup
              // via keyboard navigation and on click
              this.insertMention = command
            },
            // is called when a suggestion has changed
            onChange: ({ items, query, range, virtualNode }) => {
              this.query = query
              this.filteredUsers = items
              this.suggestionRange = range
              this.navigatedUserIndex = 0
              this.renderPopup(virtualNode)
            },
            // is called when a suggestion is cancelled
            onExit: () => {
              // reset all saved values
              this.query = null
              this.filteredUsers = []
              this.suggestionRange = null
              this.navigatedUserIndex = 0
              this.destroyPopup()
            },
            // is called on every keyDown event while a suggestion is active
            onKeyDown: ({ event }) => {
              if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
              }
              if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
              }
              if (event.key === 'Enter') {
                this.enterHandler()
                return true
              }
              return false
            },
            // is called when a suggestion has changed
            // this function is optional because there is basic filtering built-in
            // you can overwrite it if you prefer your own filtering
            // in this example we use fuse.js with support for fuzzy search
            onFilter: async (items, query) => {
              if (!query) {
                return items
              }
              await new Promise((resolve) => {
                setTimeout(resolve, 500)
              })
              /* const fuse = new Fuse(items, {
                threshold: 0.2,
                keys: ['name']
              }) */
              // return fuse.search(query).map((item) => item.item)
              return []
            }
          })
        ]
      }),
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {}
    }
  },
  computed: {
    isEmpty () {
      return isEditorEmpty(this.value)
    },
    hasResults () {
      return this.filteredUsers.length
    },
    showSuggestions () {
      return this.query || this.hasResults
    }
  },
  watch: {
    value (val) {
      if (this.emitAfterOnUpdate) {
        this.emitAfterOnUpdate = false
        return
      }
      this.editor.setContent(val)
    }
  },
  beforeDestroy () {
    this.destroyPopup()
    this.editor.destroy()
  },
  methods: {
    addEmoji (emoji) {
      const transaction = this.editor.state.tr.insertText(emoji.native)
      this.editor.view.dispatch(transaction)
    },
    showLinkPrompt (command) {
      const linkUrl = prompt('Enter the URL of your link')
      if (linkUrl) {
        command({ href: linkUrl })
      }
    },

    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler () {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length
    },
    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler () {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length
    },
    enterHandler () {
      const user = this.filteredUsers[this.navigatedUserIndex]
      if (user) {
        this.selectUser(user)
      }
    },
    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser (user) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: user.id,
          label: user.name
        }
      })
      this.editor.focus()
    },
    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup (node) {
      if (this.popup) {
      }
      // ref: https://atomiks.github.io/tippyjs/v6/all-props/
      /* this.popup = tippy('#app', {
        getReferenceClientRect: node.getBoundingClientRect,
        appendTo: () => document.body,
        interactive: true,
        sticky: true, // make sure position of tippy is updated when content changes
        plugins: [sticky],
        content: this.$refs.suggestions,
        trigger: 'mouseenter', // manual
        showOnCreate: true,
        theme: 'dark',
        placement: 'top-start',
        inertia: true,
        duration: [400, 200]
      }) */
    },
    destroyPopup () {
      if (this.popup) {
        this.popup[0].destroy()
        this.popup = null
      }
    }
  }
}
</script>

<style>
.editor-dark p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

.editor-light p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
