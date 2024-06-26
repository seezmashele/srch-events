import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TagButton from '../buttons/TagButton'
import { useApp } from '../../context/AppContext'
import { fetchRecommendedTags } from '../../utils/supabase/database/fetch'

const FeaturedTagsBar = () => {
  const { homePageCategory, changeHomePageCategory } = useApp()
  const [recommendedTags, setRecommendedTags] = useState([])

  const query = useQuery({
    queryKey: ['home-page-tags'],
    queryFn: fetchRecommendedTags
  })

  useEffect(() => {
    const { data } = query
    if (data && data.tags) setRecommendedTags(data.tags)
  }, [query])

  return (
    <div className="mt-2.5 flex h-10 w-full select-none items-center">
      <div className="flex h-9 w-full flex-grow flex-wrap space-x-3 overflow-hidden">
        {recommendedTags &&
          recommendedTags.map((item, index) => {
            const { slug } = item
            return (
              <TagButton
                label={item.title}
                slug={slug}
                index={index}
                onClick={() => {
                  changeHomePageCategory(slug)
                }}
                key={`featured-tag${index}${slug}`}
                isSelected={slug === homePageCategory}
              />
            )
          })}
      </div>
    </div>
  )
}

export default FeaturedTagsBar
