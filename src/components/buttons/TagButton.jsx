const TagButton = ({
  index,
  onClick,
  slug = '',
  label = '',
  isSelected = false
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={() => {
      if (onClick) onClick(slug, index)
    }}
    className={`mb-10 flex cursor-pointer items-center justify-center overflow-hidden truncate rounded-lg px-3 pb-2 pt-1.5 text-sm font-semibold leading-snug transition-colors ${
      isSelected
        ? 'bg-black text-white'
        : 'bg-neutral-150 text-black hover:bg-neutral-300'
    }`}
  >
    {label}
  </button>
)

export default TagButton
