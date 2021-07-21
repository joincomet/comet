import Tippy from '@tippyjs/react'
import ctl from '@netlify/classnames-template-literals'
import {
  IconFormatBold,
  IconFormatCodeBlock,
  IconFormatCodeInline,
  IconFormatDivider,
  IconFormatEmoji,
  IconFormatHeading,
  IconFormatItalic,
  IconFormatLink,
  IconFormatLinkRemove,
  IconFormatListBulleted,
  IconFormatListNumbered,
  IconFormatQuote,
  IconFormatSpoiler,
  IconFormatStrikethrough,
  IconFormatUnderline
} from '@/components/ui/icons/Icons'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@/components/ui/editor/Link'
import Underline from '@tiptap/extension-underline'
import { Spoiler } from './Spoiler'
import { useCallback, useEffect } from 'react'

export default function Editor({ text, setText }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Link,
      Underline,
      Spoiler
    ],
    content: text,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-dark focus:outline-none max-w-none min-h-[7.5rem] p-4'
      }
    }
  })

  const html = editor?.getHTML() ?? ''

  useEffect(() => {
    if (html === `<p></p>`) setText('')
    else setText(html)
  }, [editor, html, setText])

  const pasteRegex =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/i

  const pasteListener = useCallback(
    e => {
      const plain = e.clipboardData?.getData('text/plain')
      if (plain) {
        if (pasteRegex.test(plain)) {
          editor?.commands.insertContent(
            `<a href="${plain}" target="_blank" rel="noopener noreferrer nofollow">${plain}</a>`
          )
        } else {
          editor?.commands.insertContent(plain)
        }
        editor?.commands.focus()
      }
    },
    [editor]
  )

  useEffect(() => {
    document.body.addEventListener('paste', pasteListener)
    return () => {
      document.body.removeEventListener('paste', pasteListener)
    }
  }, [pasteListener])

  return (
    <div className="dark:bg-gray-750 rounded bg-gray-100">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

const formatButtonClass = active =>
  ctl(`
  p-1
  rounded
  dark:hover:bg-gray-600
  hover:bg-gray-100
  cursor-pointer
  ${
    active
      ? 'dark:bg-gray-600 dark:text-gray-300'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
  }
`)

function FormatButton({ label, icon, small, onClick, active }) {
  const Icon = icon
  return (
    <Tippy content={label}>
      <div className="h-9 flex items-center" onClick={onClick}>
        <div className={formatButtonClass(active)}>
          <Icon className={`${!small ? 'w-5 h-5' : 'w-4 h-4 mt-0.5'}`} />
        </div>
      </div>
    </Tippy>
  )
}

const formatGroupClass = ctl(`
  flex
  items-center
  px-2
  h-full
  space-x-0.5
`)

function FormatGroup({ children }) {
  return <div className={formatGroupClass}>{children}</div>
}

function MenuBar({ editor }) {
  if (!editor) return null

  return (
    <div className="min-h-[2.25rem] border-b dark:border-gray-700 border-gray-300 flex flex-wrap items-center divide-x dark:divide-gray-700 divide-gray-300">
      <FormatGroup>
        <FormatButton
          label="Bold (Ctrl+B)"
          icon={IconFormatBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        />
        <FormatButton
          label="Italic (Ctrl+U)"
          icon={IconFormatItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        />
        <FormatButton
          label="Underline (Ctrl+I)"
          icon={IconFormatUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        />
        <FormatButton
          label="Strikethrough"
          icon={IconFormatStrikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton
          label="Spoiler"
          icon={IconFormatSpoiler}
          onClick={() => editor.chain().focus().toggleSpoiler().run()}
          active={editor.isActive('spoiler')}
        />
        <FormatButton
          label="Inline Code"
          icon={IconFormatCodeInline}
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton
          label="Link"
          icon={IconFormatLink}
          onClick={() => {
            const url = window.prompt('URL')
            editor.chain().focus().setLink({ href: url }).run()
          }}
          active={editor.isActive('link')}
        />

        {editor.isActive('link') && (
          <FormatButton
            label="Remove Link"
            icon={IconFormatLinkRemove}
            onClick={() => {
              editor.chain().focus().unsetLink().run()
            }}
          />
        )}

        <FormatButton
          label="Divider"
          icon={IconFormatDivider}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton
          label="Bulleted List"
          icon={IconFormatListBulleted}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        />
        <FormatButton
          label="Numbered List"
          icon={IconFormatListNumbered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton
          label="Large Heading (Ctrl+[)"
          icon={IconFormatHeading}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive('heading', { level: 2 })}
        />
        <FormatButton
          label="Small Heading (Ctrl+])"
          icon={IconFormatHeading}
          small
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive('heading', { level: 3 })}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton
          label="Block Quote"
          icon={IconFormatQuote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        />
        <FormatButton
          label="Code Block"
          icon={IconFormatCodeBlock}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
        />
      </FormatGroup>
      <FormatGroup>
        <FormatButton label="Emoji" icon={IconFormatEmoji} />
      </FormatGroup>
    </div>
  )
}
