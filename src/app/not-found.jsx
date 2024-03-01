'use client'

import Nav from '../components/layout/Nav'
import PageHead from '../components/misc/PageHead'
import MainDrawer from '../components/drawers/MainDrawer'
import BodyWrapper from '../components/wrappers/BodyWrapper'

const NotFound = () => (
  <>
    <PageHead title="" />
    <Nav />

    <BodyWrapper>
      <MainDrawer selectedPageIndex={0} />
      <main className="content_padding_x flex w-full flex-col pb-24 pt-1.5">
        <div className="mt-8 w-full">
          <h1>404 Page</h1>
        </div>
      </main>
    </BodyWrapper>
  </>
)

export default NotFound
