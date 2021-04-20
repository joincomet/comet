import { Mark, mergeAttributes } from '@tiptap/react'

export const Spoiler = Mark.create({
  name: 'spoiler',

  inclusive: false,

  defaultOptions: {
    HTMLAttributes: {
      'data-spoiler': '1'
    }
  },

  addAttributes() {
    return {
      'data-spoiler': {
        default: '1'
      }
    }
  },

  parseHTML() {
    return [{ tag: `span[data-spoiler='1']` }]
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
