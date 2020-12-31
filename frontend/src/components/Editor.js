// @refresh reset
import React, { useMemo } from 'react'
import { Editable, Slate, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { useAndroidPlugin } from 'slate-android-plugin'

export default function Editor({ value, setValue }) {
  const editor = useAndroidPlugin(useMemo(() => withReact(createEditor()), []))

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable
        placeholder="Write your comment"
        className="dark:bg-gray-900 p-3 rounded prose prose-sm dark:prose-dark h-32 min-w-full overflow-y-auto"
      />
    </Slate>
  )
}
