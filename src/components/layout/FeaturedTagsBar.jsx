import { useState } from 'react'
import TagButton from '../buttons/TagButton'

const FeaturedTagsBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const changeHomePageCategory = (slug, index) => {
    setSelectedIndex(index)
  }

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
            <TagButton
              label={item}
              slug={item}
              index={index}
              onClick={changeHomePageCategory}
              key={`featured-tag${index}`}
              isSelected={index === selectedIndex}
            />
          ))}
      </div>
    </div>
  )
}

export default FeaturedTagsBar
