import React, { useEffect, useState } from 'react'
import { fromHtml, toHtml } from 'remirror/core'
import { BlockquoteExtension } from 'remirror/extension/blockquote'
import { BoldExtension } from 'remirror/extension/bold'
import { CodeExtension } from 'remirror/extension/code'
import { CodeBlockExtension } from 'remirror/extension/code-block'
import { ItalicExtension } from 'remirror/extension/italic'
import { ParagraphExtension } from 'remirror/extension/paragraph'
import { PlaceholderExtension } from 'remirror/extension/placeholder'
import { StrikeExtension } from 'remirror/extension/strike'
import { UnderlineExtension } from 'remirror/extension/underline'
import { HeadingExtension } from 'remirror/extension/heading'
import { RemirrorProvider, useManager, useRemirror } from 'remirror/react'
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiCode,
  FiLink2,
  FiType
} from 'react-icons/fi'
import { CustomLinkExtension } from '@/lib/CustomLinkExtension'
import Tippy from '@tippyjs/react'

const extensionTemplate = () => [
  new BoldExtension(),
  new BlockquoteExtension(),
  new CodeBlockExtension(),
  new CodeExtension(),
  new ItalicExtension(),
  new CustomLinkExtension(),
  new ParagraphExtension(),
  new PlaceholderExtension({
    placeholder: 'Details'
  }),
  new StrikeExtension(),
  new UnderlineExtension(),
  new HeadingExtension({ levels: [3] })
]

const button =
  'focus:outline-none w-8 h-8 inline-flex items-center justify-center'

function EditorInner() {
  const { getRootProps, commands } = useRemirror()

  return (
    <div>
      <div className="flex items-center mb-2">
        <Tippy content="Bold">
          <button
            type="button"
            onClick={() => commands.toggleBold()}
            className={button}
          >
            <FiBold size={16} />
          </button>
        </Tippy>

        <Tippy content="Italic">
          <button
            type="button"
            onClick={() => commands.toggleItalic()}
            className={button}
          >
            <FiItalic size={16} />
          </button>
        </Tippy>

        <Tippy content="Underline">
          <button
            type="button"
            onClick={() => commands.toggleUnderline()}
            className={button}
          >
            <FiUnderline size={16} />
          </button>
        </Tippy>

        <Tippy content="Link">
          <button
            type="button"
            onClick={() => {
              const link = prompt('Paste link or leave blank to remove link')
              if (!link) commands.removeLink()
              else commands.updateLink({ href: link, auto: false })
            }}
            className={button}
          >
            <FiLink2 size={16} />
          </button>
        </Tippy>

        <Tippy content="Code">
          <button
            type="button"
            onClick={() => commands.toggleCode()}
            className={button}
          >
            <FiCode size={16} />
          </button>
        </Tippy>

        <Tippy content="Heading">
          <button
            type="button"
            onClick={() => commands.toggleHeading({ level: 3 })}
            className={button}
          >
            <FiType size={16} />
          </button>
        </Tippy>
      </div>

      <div {...getRootProps()} />
    </div>
  )
}

export default function MyEditor({ value, setValue }) {
  const manager = useManager(extensionTemplate)

  const [json, setJson] = useState(() =>
    manager.createState({
      content: value,
      stringHandler: fromHtml
    })
  )

  useEffect(
    () =>
      setValue(
        toHtml({ node: json.doc, schema: json.schema }).replace(
          /<[^/>][^>]*><\/[^>]+>/,
          ''
        )
      ),
    [json]
  )

  return (
    <RemirrorProvider
      autoFocus
      manager={manager}
      value={json}
      onChange={({ state }) => setJson(state)}
    >
      <EditorInner />
    </RemirrorProvider>
  )
}
