import TagButton from '../buttons/TagButton'
import { useApp } from '../../context/AppContext'

const FeaturedTagsBar = () => {
  const {
    homePageCategory,
    changeHomePageCategory,
    useRecommendedHomePageTags
  } = useApp()
  const { recommendedHomePageTags } = useRecommendedHomePageTags()

  return (
    <div className="mt-2.5 flex h-10 w-full select-none items-center">
      <div className="flex h-9 w-full flex-grow flex-wrap space-x-3 overflow-hidden">
        {recommendedHomePageTags &&
          recommendedHomePageTags.map((item, index) => {
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
