'use client'

import { useState } from 'react'
import Nav from '../../components/layout/Nav'
import PageHead from '../../components/misc/PageHead'
import MainDrawer from '../../components/drawers/MainDrawer'
import BodyWrapper from '../../components/wrappers/BodyWrapper'
import AccountSettings from '../../components/settings/AccountSettings'
import ProfileSettings from './views/ProfileSettings'
import SettingsDrawer from '../../components/drawers/SettingsDrawer'

const Example3 = () => <div>hello3</div>
const Example4 = () => <div>hello4</div>

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0)

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={4} />
        <main className="content_padding_x flex min-h-[10rem] w-full flex-row items-stretch py-0">
          <SettingsDrawer
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <div className="w-full max-w-2xl py-7 pl-9">
            {currentPage === 0 && <ProfileSettings />}
            {currentPage === 1 && <Example3 />}
            {currentPage === 2 && <AccountSettings />}
            {currentPage === 3 && <Example4 />}
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default HomePage
