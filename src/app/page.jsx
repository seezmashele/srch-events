'use client'

// import Image from 'next/image'
import Nav from '../components/nav/Nav'
import PageHead from '../components/misc/PageHead'
import { useDatabase } from '../context/DatabaseContext'
import EventsBlock from '../components/blocks/EventsBlock'
import MainDrawer from '../components/drawers/MainDrawer'
import FeaturedTagsBar from '../components/tabs/FeaturedTagsBar'
import BodyWrapper from '../components/wrappers/BodyWrapper'

const Home = () => {
  const { useHomePageEvents } = useDatabase()
  const { homePageEvents1 } = useHomePageEvents()

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={0} />
        <main className="content_padding_x flex w-full flex-col pb-24 pt-1.5">
          <FeaturedTagsBar />
          <div className="mt-8 w-full">
            {homePageEvents1 && (
              <EventsBlock events={homePageEvents1} title="" />
            )}
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default Home
