'use client'

// import Image from 'next/image'
import Nav from '../../components/nav/Nav'
import PageHead from '../../components/misc/PageHead'
import { useDatabase } from '../../context/DatabaseContext'
import EventsListBlock from '../../components/blocks/EventsListBlock'
import MainDrawer from '../../components/drawers/MainDrawer'
import BodyWrapper from '../../components/wrappers/BodyWrapper'
import SectionTitle from '../../components/misc/SectionTitle'

const Home = () => {
  const { useHomePageEvents } = useDatabase()
  const { homePageEvents1 } = useHomePageEvents()

  return (
    <>
      <PageHead title="" />
      <Nav />

      <MainDrawer selectedPageIndex={1} />
      <BodyWrapper>
        <div className="main_content_container">
          <main className="page_padding_x max_page_width--wide mx-auto flex w-full flex-col pb-24 pt-1.5">
            <SectionTitle title="Recent events" />
            <div className="main_content_container mt-3">
              {homePageEvents1 && (
                <EventsListBlock events={homePageEvents1} title="" />
              )}
            </div>
          </main>
        </div>
      </BodyWrapper>
    </>
  )
}

export default Home
