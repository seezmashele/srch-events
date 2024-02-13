import Link from 'next/link'

const FeaturedTagsBar = ({ selectedTagIndex = 0 }) => {
  const tempTags = [
    'All',
    'gaming',
    'meetups',
    'music',
    'cars',
    'tech',
    'business',
    'foodandrinks',
    'tournament',
    'sports',
    'education',
    'charity',
    'cosplay',
    'environmental',
    'skyrim',
    'workshop',
    'vanguard',
    'cyberpunk',
    'announcement'
  ]
  const tempTags2 = tempTags.splice(20)
  tempTags2.splice(10)

  return (
    <div className="mt-2.5 flex h-10 w-full select-none items-center">
      <div className="flex h-9 w-full flex-grow flex-wrap space-x-3 overflow-hidden">
        {tempTags &&
          tempTags.map((item, index) => (
            <Link href="/" key={`featuredTag${index}`}>
              <div
                className={`h-8f mb-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg transition-colors ${
                  index === selectedTagIndex
                    ? 'bg-black text-white'
                    : 'bg-neutral-150 text-black hover:bg-neutral-300'
                }`}
              >
                <p className="h-full w-full truncate px-3 pb-2 pt-1.5 text-sm font-semibold leading-snug">
                  {item}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default FeaturedTagsBar
