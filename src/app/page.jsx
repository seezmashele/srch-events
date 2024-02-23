'use client'

import { useEffect, useState } from 'react'
import Nav from '../components/layout/Nav'
import PageHead from '../components/misc/PageHead'
// import { useDatabase } from '../context/DatabaseContext'
import EventsBlock from '../components/blocks/EventsBlock'
import MainDrawer from '../components/drawers/MainDrawer'
import FeaturedTagsBar from '../components/layout/FeaturedTagsBar'
import BodyWrapper from '../components/wrappers/BodyWrapper'
import { useApp } from '../context/AppContext'
import { fetchEventsByTag } from '../utils/supabase/database/fetch'

const Home = () => {
  const { homePageCategory } = useApp()
  const [homePageEvents, setHomePageEvents] = useState(null)

  useEffect(() => {
    // cache the result of fetchEventsByTag with react query
    const getEvents = async () => {
      const events = await fetchEventsByTag(homePageCategory)
      setHomePageEvents(events || null)
    }
    getEvents()
  }, [homePageCategory])

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
