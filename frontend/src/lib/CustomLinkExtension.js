import { LinkExtension } from 'remirror/extension/link'
import { isElementDomNode, omitExtraAttributes } from 'remirror/core'

export class CustomLinkExtension extends LinkExtension {
  createMarkSpec(extra) {
    const AUTO_ATTRIBUTE = 'data-link-auto'
    return {
      attrs: {
        ...extra.defaults(),
        href: {},
        auto: { default: false }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: node => {
            if (!isElementDomNode(node)) {
              return false
            }

            const href = node.getAttribute('href')
            const auto =
              node.hasAttribute(AUTO_ATTRIBUTE) ||
              this.options.autoLinkRegex.test(node.textContent ?? '')
            return { ...extra.parse(node), href, auto }
          }
        }
      ],
      toDOM: node => {
        const { auto: _, ...rest } = omitExtraAttributes(node.attrs, extra)
        const auto = node.attrs.auto ? { [AUTO_ATTRIBUTE]: '' } : {}
        const rel = 'noopener noreferrer nofollow'
        const attrs = {
          ...extra.dom(node),
          ...rest,
          rel,
          target: '_blank',
          ...auto
        }

        return ['a', attrs, 0]
      }
    }
  }
}
