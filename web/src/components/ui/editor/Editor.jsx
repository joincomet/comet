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
  IconFormatListBulleted,
  IconFormatListNumbered,
  IconFormatQuote,
  IconFormatSpoiler,
  IconFormatStrikethrough,
  IconFormatUnderline
} from '@/components/ui/icons/Icons'
import toast from 'react-hot-toast'
import ContentEditable from './ContentEditable'

export default function Editor({ text, setText }) {
  return (
    <div className="dark:bg-gray-700 rounded">
      <div className="h-9 border-b dark:border-gray-650 flex items-center divide-x dark:divide-gray-650">
        <FormatGroup>
          <FormatButton label="Bold (Ctrl+B)" icon={IconFormatBold} />
          <FormatButton label="Italic (Ctrl+U)" icon={IconFormatItalic} />
          <FormatButton label="Underline (Ctrl+I)" icon={IconFormatUnderline} />
          <FormatButton label="Strikethrough" icon={IconFormatStrikethrough} />
        </FormatGroup>
        <FormatGroup>
          <FormatButton label="Spoiler" icon={IconFormatSpoiler} />
          <FormatButton label="Inline Code" icon={IconFormatCodeInline} />
        </FormatGroup>
        <FormatGroup>
          <FormatButton label="Link" icon={IconFormatLink} />
          <FormatButton label="Image" icon={IconFormatImage} />
          <FormatButton label="Divider" icon={IconFormatDivider} />
        </FormatGroup>
        <FormatGroup>
          <FormatButton label="Bulleted List" icon={IconFormatListBulleted} />
          <FormatButton label="Numbered List" icon={IconFormatListNumbered} />
        </FormatGroup>
        <FormatGroup>
          <FormatButton
            label="Large Heading (Ctrl+[)"
            icon={IconFormatHeading}
          />
          <FormatButton
            label="Small Heading (Ctrl+])"
            icon={IconFormatHeading}
            small
          />
        </FormatGroup>
        <FormatGroup>
          <FormatButton label="Block Quote" icon={IconFormatQuote} />
          <FormatButton label="Code Block" icon={IconFormatCodeBlock} />
        </FormatGroup>
        <FormatGroup>
          <FormatButton label="Emoji" icon={IconFormatEmoji} />
        </FormatGroup>
      </div>
      <ContentEditable
        html={text}
        className="min-h-[7.5rem] p-4 focus:outline-none text-base text-primary"
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}

function FormatButton({ label, icon, small }) {
  const Icon = icon
  return (
    <Tippy content={label}>
      <div onClick={() => toast.error('Formatting is coming soon!')}>
        <Icon
          className={`${!small ? 'w-5 h-5' : 'w-4 h-4 mt-0.5'} highlightable`}
        />
      </div>
    </Tippy>
  )
}

const formatGroupClass = ctl(`
  flex
  items-center
  space-x-3
  px-4
  h-full
`)

function FormatGroup({ children }) {
  return <div className={formatGroupClass}>{children}</div>
}
