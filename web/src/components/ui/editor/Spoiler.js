import { Mark, mergeAttributes } from '@tiptap/react'

export const Spoiler = Mark.create({
  name: 'spoiler',

  inclusive: false,

  defaultOptions: {
    HTMLAttributes: {
      'data-spoiler': ''
    }
  },

  addAttributes() {
    return {
      'data-spoiler': {
        default: ''
      }
    }
  },

  parseHTML() {
    return [{ tag: `span[data-spoiler]` }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },

  addCommands() {
    return {
      setSpoiler: attributes => ({ commands }) => {
        return commands.setMark('spoiler', attributes)
      },
      toggleSpoiler: attributes => ({ commands }) => {
        return commands.toggleMark('spoiler', attributes)
      },
      unsetSpoiler: () => ({ commands }) => {
        return commands.unsetMark('spoiler')
      }
    }
  }
})
