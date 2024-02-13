/* eslint-disable no-alert */

import {
  TypeBold,
  TypeItalic,
  TypeUnderline,
  Youtube,
  TypeH1,
  ListUl,
  TypeStrikethrough,
  ListOl,
  Quote
} from 'react-bootstrap-icons'

// limit videos to 5

const TiptapToolbar = ({ editor, setShowYoutubeLinkModal }) => {
  if (!editor) return null

  return (
    <div className="border-bf flex w-full flex-wrap justify-center gap-1 border-black p-5">
      <button
        type="button"
        aria-label="toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive('bold') ? 'editor_button--active' : 'editor_button'
        }
      >
        <TypeBold />
      </button>
      <button
        type="button"
        aria-label="toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive('italic') ? 'editor_button--active' : 'editor_button'
        }
      >
        <TypeItalic />
      </button>
      <button
        type="button"
        aria-label="toggle underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={
          editor.isActive('underline')
            ? 'editor_button--active'
            : 'editor_button'
        }
      >
        <TypeUnderline />
      </button>
      <button
        type="button"
        aria-label="toggle strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive('strike') ? 'editor_button--active' : 'editor_button'
        }
      >
        <TypeStrikethrough />
      </button>
      <button
        type="button"
        aria-label="toggle heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 })
            ? 'editor_button--active'
            : 'editor_button'
        }
      >
        <TypeH1 />
      </button>
      <button
        type="button"
        aria-label="toggle bullet list"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList')
            ? 'editor_button--active'
            : 'editor_button'
        }
      >
        <ListUl />
      </button>
      <button
        type="button"
        aria-label="toggle ordered list"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList')
            ? 'editor_button--active'
            : 'editor_button'
        }
      >
        <ListOl />
      </button>
      <button
        type="button"
        aria-label="toggle blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive('blockquote')
            ? 'editor_button--active'
            : 'editor_button'
        }
      >
        <Quote />
      </button>
      <button
        type="button"
        aria-label="add youtube video"
        onClick={() => {
          setShowYoutubeLinkModal(true)
        }}
        className="editor_button"
      >
        <Youtube />
      </button>
    </div>
  )
}

export default TiptapToolbar
