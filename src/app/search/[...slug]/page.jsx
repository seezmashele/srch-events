'use client'

import { ArrowDown } from 'react-bootstrap-icons'
import Nav from '../../../components/nav/Nav'
import PageHead from '../../../components/misc/PageHead'
import { useDatabase } from '../../../context/DatabaseContext'
import EventsListBlock from '../../../components/blocks/EventsListBlock'
import MainDrawer from '../../../components/drawers/MainDrawer'
import BodyWrapper from '../../../components/wrappers/BodyWrapper'

const HomePage = () => {
  const { useHomePageEvents } = useDatabase()
  const { homePageEvents2 } = useHomePageEvents()

  return (
    <>
      <PageHead title="" />
      <Nav />

      <MainDrawer selectedPageIndex={1} />
      <BodyWrapper>
        <div className="main_content_container">
          {/* <FeaturedTagsBar /> */}
          <div className="max_page_width--narrow mx-auto">
            <div className="page_padding_x mt-3 flex h-11 w-full select-none items-start text-black">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  {/* <Heart className="mr-4 text-accent-mainf w-5 h-5" /> */}
                  <div className="uppercasef tracking-widestf mt-1.5 whitespace-nowrap text-base font-semibold">
                    Search results: Evetech
                  </div>
                </div>
                <div className="flexf h-10f hidden w-full flex-grow flex-wrap items-center justify-end overflow-hidden">
                  <div className="font-semiboldf bg-neutral-100f text-accent-mainf h-10f rounded-fullf box_radius mr-2 flex cursor-pointer items-center border px-5 py-1.5 text-sm hover:bg-neutral-50">
                    Filter
                  </div>
                  <div className="bg-neutral-100f text-accent-mainf h-10f rounded-fullf box_radius mr-2 flex cursor-pointer items-center border px-4 py-1.5 text-sm hover:bg-neutral-50">
                    <div className="mr-2f">Sort by</div>
                    <div className="mx-3 h-3 border-l border-neutral-300" />
                    <div className="mr-2 w-14">Date</div>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </div>

                  {/* <div className="bg-neutral-100F flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-neutral-100">
                <ListUl className="h-4 w-4" />
              </div> */}
                </div>
              </div>
            </div>
            <main className="page_padding_x flex w-full flex-row">
              <div className="main_content_container border-tf mt-4 pt-0.5">
                {homePageEvents2 && (
                  <EventsListBlock events={homePageEvents2} title="" />
                )}
              </div>
            </main>
          </div>
        </div>
      </BodyWrapper>
    </>
  )
}

export default HomePage
