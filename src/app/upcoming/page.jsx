'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Nav from '../../components/layout/Nav'
import PageHead from '../../components/misc/PageHead'
import EventsBlock from '../../components/blocks/EventsBlockSmall'
import MainDrawer from '../../components/drawers/MainDrawer'
import UpcomingHolidaysBar from '../../components/layout/UpcomingHolidaysBar'
import BodyWrapper from '../../components/wrappers/BodyWrapper'
import { useApp } from '../../context/AppContext'
import { fetchEventsByTag } from '../../utils/supabase/database/fetch'

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
  const [homePageEvents, setHomePageEvents] = useState([{ placeholder: true }])
  const [trimmedEvents, setTrimmedEvents] = useState(null)
  const [trimmedEvents2, setTrimmedEvents2] = useState(null)
  const [trimmedEvents3, setTrimmedEvents3] = useState(null)

  const { data, isLoading } = useHomePageEvents(homePageCategory)

  useEffect(() => {
    if (data && data.events) setHomePageEvents(data.events)
  }, [data])

  useEffect(() => {
    if (homePageEvents) {
      const newArr = Array.from(homePageEvents)
      const newArr2 = newArr.splice(7).reverse()
      const newArr3 = newArr2.splice(8).reverse()
      newArr3.splice(8).reverse()
      setTrimmedEvents(newArr)
      setTrimmedEvents2(newArr2)
      setTrimmedEvents3(newArr3)
    }
  }, [homePageEvents])
  // useEffect(() => {
  //   if (isLoading) setHomePageEvents([{ placeholder: true }])
  // }, [isLoading])

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={1} />
        <main className="content_padding_x flex w-full flex-col pb-24 pt-1.5">
          <UpcomingHolidaysBar />

          <div
            className={`${isLoading && 'pointer-events-none opacity-60'} mt-5 w-full transition-opacity`}
          >
            <p className="mb-5 text-xl font-semibold">This week</p>
            {homePageEvents && <EventsBlock events={trimmedEvents} title="" />}
          </div>

          <div className="border_color_main my-3 w-full border-t" />

          <div
            className={`${isLoading && 'pointer-events-none opacity-60'} mt-5 w-full transition-opacity`}
          >
            <p className="mb-5 text-xl font-semibold">This month</p>
            {homePageEvents && <EventsBlock events={trimmedEvents2} title="" />}
          </div>

          <div className="border_color_main my-3 w-full border-t" />

          <div
            className={`${isLoading && 'pointer-events-none opacity-60'} mt-5 w-full transition-opacity`}
          >
            <p className="mb-5 text-xl font-semibold">April</p>
            {homePageEvents && <EventsBlock events={trimmedEvents3} title="" />}
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default Home
