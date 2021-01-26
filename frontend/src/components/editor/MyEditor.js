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
import {
  FaHeading,
  FaBold,
  FaUnderline,
  FaStrikethrough,
  FaItalic,
  FaLink,
  FaUnlink,
  FaCode,
  FaFileCode
} from 'react-icons/fa'
import Tippy from '@tippyjs/react'
import { LinkExtension } from 'remirror/extension/link'

const extensionTemplate = () => [
  new BoldExtension(),
  new BlockquoteExtension(),
  new CodeBlockExtension(),
  new CodeExtension(),
  new ItalicExtension(),
  new LinkExtension({ extraAttributes: { target: '_blank' } }),
  new ParagraphExtension(),
  new PlaceholderExtension({
    placeholder: 'Text'
  }),
  new StrikeExtension(),
  new UnderlineExtension(),
  new HeadingExtension({ levels: [3] })
]

const button =
  'focus:outline-none transition hover:text-black dark:hover:text-white'

function EditorInner() {
  const { getRootProps, commands } = useRemirror()

  return (
    <div>
      <div className="flex items-center space-x-3 text-tertiary mb-4 ml-1">
        <Tippy content="Bold">
          <button
            type="button"
            onClick={() => commands.toggleBold()}
            className={button}
          >
            <FaBold className="w-4 h-4" />
          </button>
        </Tippy>

        <Tippy content="Italic">
          <button
            type="button"
            onClick={() => commands.toggleItalic()}
            className={button}
          >
            <FaItalic className="w-4 h-4" />
          </button>
        </Tippy>

        <Tippy content="Underline">
          <button
            type="button"
            onClick={() => commands.toggleUnderline()}
            className={button}
          >
            <FaUnderline className="w-4 h-4" />
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
            <FaLink className="w-4 h-4" />
          </button>
        </Tippy>

        <Tippy content="Code">
          <button
            type="button"
            onClick={() => commands.toggleCode()}
            className={button}
          >
            <FaCode className="w-4 h-4" />
          </button>
        </Tippy>

        <Tippy content="Heading">
          <button
            type="button"
            onClick={() => commands.toggleHeading({ level: 3 })}
            className={button}
          >
            <FaHeading className="w-4 h-4" />
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
