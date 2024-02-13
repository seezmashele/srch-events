import { useEditor, EditorContent } from '@tiptap/react'
import extensions from './extensions/viewer'

const TiptapViewer = ({ content = '' }) => {
  const editor = useEditor({
    content,
    extensions,
    editable: false
  })

  if (!editor) return null

  return (
    <div className="tiptap_viewer overflow-hidden">
      <EditorContent className="w-full" editor={editor} />
    </div>
  )
}

export default TiptapViewer
