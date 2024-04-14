import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import TagButton from '../buttons/TagButton'
import { useApp } from '../../context/AppContext'
import { fetchRecommendedTags } from '../../utils/supabase/database/fetch'

const UpcomingHolidaysBar = () => {
  const { homePageCategory, changeHomePageCategory } = useApp()
  // const [holidays, setHolidays] = useState([])

  // eslint-disable-next-line no-unused-vars
  const [holidays, setHolidays] = useState([
    { title: 'All', slug: 'all' },
    { title: 'Easter', slug: 'easter' },
    { title: 'Good Friday', slug: 'goodfriday' },
    { title: 'Labor Day', slug: 'laborday' },
    { title: 'Independence Day', slug: 'independenceday' },
    { title: 'New Years', slug: 'newyears' },
    { title: 'Childrens Day', slug: 'hello' },
    { title: 'Christmas', slug: 'hello' }
  ])

  // eslint-disable-next-line no-unused-vars
  const query = useQuery({
    queryKey: ['home-page-tags'],
    queryFn: fetchRecommendedTags
  })

  // useEffect(() => {
  //   const { data } = query
  //   if (data && data.tags) setHolidays(data.tags)
  // }, [query])

  return (
    <div className="mt-2.5 flex h-10 w-full select-none items-center">
      <div className="flex h-9 w-full flex-grow flex-wrap space-x-3 overflow-hidden">
        {holidays &&
          holidays.map((item, index) => {
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

export default UpcomingHolidaysBar
