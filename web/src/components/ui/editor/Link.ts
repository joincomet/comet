import { markInputRule } from '@tiptap/react'
import { Link } from '@tiptap/extension-link'
import { InputRule, inputRules } from 'prosemirror-inputrules'
import { MarkType } from 'prosemirror-model'
import { Plugin, PluginKey } from 'prosemirror-state'

// These are almost the same as pasteRegex and pasteRegexWithBrackets but with
// additional [\s\n] at the end so they apply after adding white space or a new line
export const linkInputRegex =
  /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*))[\s\n]$/gi
export const linkInputRegexWithBrackets =
  /(?:\()https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/()]*)(?:\))[\s\n]$/gi

function markInputRuleKeepTrailingChar(
  regexp: RegExp,
  markType: MarkType,
  getAttributes?: Function
): InputRule {
  // version of markInputRule that adds the missing trailing char
  const standardMarkInputRule = markInputRule(regexp, markType, getAttributes)
  return new InputRule(regexp, (state, match, start, end) => {
    const tr = (standardMarkInputRule as any).handler(state, match, start, end)
    if (tr) {
      // If the mark has been applied add the trailing char at the end of the edit
      tr.insertText(match[0].slice(-1), end)
    }
    return tr
  })
}

export default Link.extend({
  addProseMirrorPlugins() {
    const rules = [
      markInputRuleKeepTrailingChar(
        linkInputRegex,
        this.type,
        (url: string[]) => ({ href: url[1] })
      ),
      markInputRuleKeepTrailingChar(
        linkInputRegexWithBrackets,
        this.type,
        (url: string[]) => ({ href: url[1] })
      )
    ]
    const plugin: any = inputRules({ rules })
    const run = plugin.props.handleTextInput
    // Add 'enter'/newline support to input rule - Based on:
    // https://discuss.prosemirror.net/t/trigger-inputrule-on-enter/1118/5
    plugin.props.handleKeyDown = (view: any, event: any) => {
      if (event.key !== 'Enter') return false
      const { $cursor } = view.state.selection
      if ($cursor) return run(view, $cursor.pos, $cursor.pos, '\n')
      return false
    }
    return [
      plugin,
      new Plugin({
        key: new PluginKey('handlePaste'),
        props: {
          handlePaste: () => {
            return true
          }
        }
      })
    ]
  }
})
