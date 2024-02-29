const TagButton = ({ onClick, label = '', isSelected = false }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`tag_radius mb-10 flex cursor-pointer items-center justify-center overflow-hidden truncate px-3 pb-2 pt-1.5 text-sm font-semibold leading-snug ${
      isSelected
        ? 'bg-black text-white'
        : 'bg-neutral-150 text-black hover:bg-neutral-300'
    }`}
  >
    {label}
  </button>
)

export default TagButton
