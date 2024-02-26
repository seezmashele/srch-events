'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Nav from '../components/layout/Nav'
import PageHead from '../components/misc/PageHead'
import EventsBlock from '../components/blocks/EventsBlock'
import MainDrawer from '../components/drawers/MainDrawer'
import FeaturedTagsBar from '../components/layout/FeaturedTagsBar'
import BodyWrapper from '../components/wrappers/BodyWrapper'
import { useApp } from '../context/AppContext'
import { fetchEventsByTag } from '../utils/supabase/database/fetch'

const useHomePageEvents = (category) => {
  const queryKey = ['home-page-events', category]
  const queryFn = async () => fetchEventsByTag(category)

  return useQuery({
    queryKey,
    queryFn
  })
}

const Home = () => {
  const { homePageCategory } = useApp()
  const [homePageEvents, setHomePageEvents] = useState(null)

  const { data } = useHomePageEvents(homePageCategory)

  useEffect(() => {
    if (data && data.events) setHomePageEvents(data.events)
  }, [data])

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={0} />
        <main className="content_padding_x flex w-full flex-col pb-24 pt-1.5">
          <FeaturedTagsBar />

          <div className="mt-8 w-full">
            {homePageEvents && <EventsBlock events={homePageEvents} title="" />}
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default Home
