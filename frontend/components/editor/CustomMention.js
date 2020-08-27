import { Mention } from 'tiptap-extensions'
export default class CustomMention extends Mention {
  get schema() {
    return {
      attrs: {
        id: {},
        label: {}
      },
      group: 'inline',
      inline: true,
      selectable: false,
      atom: true,
      toDOM: (node) => [
        'span',
        {
          class: this.options.mentionClass,
          'data-mention-id': node.attrs.id
        },
        ''.concat(this.options.matcher.char).concat(node.attrs.label)
      ],
      parseDOM: [
        {
          tag: 'span[data-mention-id]',
          getAttrs: (dom) => {
            const id = dom.getAttribute('data-mention-id')
            const label = dom.textContent
              .split(this.options.matcher.char)
              .join('')
            return {
              id,
              label
            }
          }
        }
      ]
    }
  }
}
