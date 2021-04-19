import Tippy from '@tippyjs/react'
import ctl from '@netlify/classnames-template-literals'
import {
  IconFormatBold,
  IconFormatCodeBlock,
  IconFormatCodeInline,
  IconFormatDivider,
  IconFormatEmoji,
  IconFormatHeading,
  IconFormatImage,
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
import { defaultExtensions } from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
// import { Spoiler } from './Spoiler'
import { useEffect } from 'react'

export default function Editor({ text, setText }) {
  const editor = useEditor({
    extensions: [
      ...defaultExtensions({
        heading: {
          levels: [2, 3]
        }
      }).filter(extension => extension.config.name !== 'hardBreak'),
      Link,
      Underline
      // Spoiler
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

  return (
    <div className="dark:bg-gray-700 rounded">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {/*<ContentEditable
        html={text}
        className="min-h-[7.5rem] p-4 focus:outline-none text-base text-primary"
        onChange={e => setText(e.target.value)}
      />*/}
    </div>
  )
}

const formatButtonClass = active =>
  ctl(`
  p-1
  rounded
  dark:hover:bg-gray-600
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
    <div className="min-h-[2.25rem] border-b dark:border-gray-650 flex flex-wrap items-center divide-x dark:divide-gray-650">
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

        <FormatButton label="Image" icon={IconFormatImage} />
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
