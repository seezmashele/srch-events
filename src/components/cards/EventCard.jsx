import Link from 'next/link'
import { Grid } from '@mui/material'
import { useState } from 'react'
// import { getPostAge } from "../../utils/helpers/time"
import * as AspectRatio from '@radix-ui/react-aspect-ratio'

const EventCard = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true)
  const eventTitle = data.title
  const eventImage = data.thumbnailImage
  const city = data.city || ''
  const cardLink = data.slug ? `/event/${data.slug}` : '/'
  const cardStartingDate = data.startDate || ''
  const cardAuthor = data.authorDisplayName ? data.authorDisplayName : ''
  const authorProfileLink = data.authorUsername
    ? `/profile/${data.authorUsername}`
    : '/'

  return (
    <Grid item xs={12} mobile={6} sm={6} md={4} lg={4}>
      <div className="card_container relative overflow-hidden xs:mb-1 mui_mobile:mb-6">
        <Link
          href={cardLink}
          passHref
          className="box_radius aspect-videof relative left-0 top-0 inline-block w-full cursor-pointer overflow-hidden"
        >
          <AspectRatio.Root ratio={16 / 9}>
            <img
              draggable="false"
              className={`image_bg absolute left-0 h-full w-full overflow-hidden object-cover transition-opacity duration-500 ${
                isLoading ? 'opacity-0f' : 'opacity-100f'
              }`}
              onLoad={() => {
                setIsLoading(false)
              }}
              src={eventImage}
              alt={eventTitle}
            />
          </AspectRatio.Root>
        </Link>
        <div className="flex w-full select-none">
          <div className="relative inline-block w-1/2 flex-grow">
            <div className="mt-2 text-sm">
              <Link href={cardLink} passHref>
                <div className="card_title max-h-12 select-text overflow-hidden pt-0 text-lg leading-snug text-black">
                  {eventTitle}
                </div>
              </Link>

              <div className="mt-2.5 flex items-center">
                <div className="mt-0.5f text-md mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
                  B
                </div>
                <div className="w-full text-neutral-600">
                  <div className="font-semiboldf text-blackf flex w-full items-center overflow-hidden">
                    <p className="flex-shrink-0 text-nowrap font-semibold text-black">
                      {cardStartingDate}
                    </p>
                    {city && (
                      <>
                        <div className="mx-2.5 mt-0.5 h-0.5 w-0.5 flex-shrink-0 rounded-full bg-neutral-500" />
                        <p className="overflow-ellipsis whitespace-nowrap">
                          {city}
                          {/* {city}
                        {city}
                        {city} */}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={authorProfileLink}
                      passHref
                      className="cursor-pointer hover:underline"
                    >
                      {cardAuthor}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_border_color mt-4 w-full border-b xs:flex mui_mobile:hidden" />
      </div>
    </Grid>
  )
}

export default EventCard
