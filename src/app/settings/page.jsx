'use client'

import { useState } from 'react'
import { Person } from 'react-bootstrap-icons'
import Nav from '../../components/layout/Nav'
import PageHead from '../../components/misc/PageHead'
import MainDrawer from '../../components/drawers/MainDrawer'
import BodyWrapper from '../../components/wrappers/BodyWrapper'
import AccountSettings from '../../components/settings/AccountSettings'

const Example2 = () => <div>hello2</div>
const Example3 = () => <div>hello3</div>
const Example4 = () => <div>hello4</div>

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const settingsOptions = [
    {
      title: 'My Account',
      icon: <Person />
    },
    {
      title: 'Profile',
      icon: <Person />
    }
  ]

  return (
    <>
      <PageHead title="" />
      <Nav />

      <BodyWrapper>
        <MainDrawer selectedPageIndex={4} />
        <main className="content_padding_x flex min-h-[10rem] w-full flex-row items-stretch py-5">
          <div className="box_radius relative h-full min-h-screen w-56 flex-shrink-0 bg-neutral-100 px-2 py-3">
            <div className="px-3 font-semibold">Settings</div>
            <div className="my-3 w-full border-t" />
            {settingsOptions.map((item, index) => {
              const itemKey = `settings-item${item.title}${index}`
              if (item.sectionTitle) {
                return (
                  <div
                    key={itemKey}
                    className="my-1 flex w-full items-center p-2.5 text-left text-xs font-semibold uppercase tracking-wider"
                  >
                    <p>{item.sectionTitle}</p>
                  </div>
                )
              }
              if (item.divider) {
                return (
                  <div className="mb-3 mt-3" key={itemKey}>
                    <div className="main_border_color w-full border-b" />
                  </div>
                )
              }
              return (
                <button
                  key={itemKey}
                  type="button"
                  onClick={() => {
                    setCurrentPage(index)
                  }}
                  className={`box_radius mb-1f flex w-full cursor-pointer items-center p-2.5 text-left text-sm hover:bg-neutral-200 ${
                    index === currentPage && 'bg-neutral-100 font-semibold'
                  }`}
                >
                  <div className="ml-0.5 mr-2.5 flex h-5 w-5 items-center justify-center">
                    {item.icon}
                  </div>
                  <p>{item.title}</p>
                </button>
              )
            })}
          </div>
          <div className="w-full max-w-2xl py-8 pl-9">
            {currentPage === 1 && <AccountSettings />}
            {currentPage === 2 && <Example2 />}
            {currentPage === 3 && <Example3 />}
            {currentPage === 4 && <Example4 />}
          </div>
        </main>
      </BodyWrapper>
    </>
  )
}

export default HomePage
