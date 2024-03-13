import Link from 'next/link'
import { Grid } from '@mui/material'
import { useState } from 'react'
// import { getPostAge } from "../../utils/helpers/time"

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
    <Grid item xs={12} mobile={6} sm={6} md={4} lg={3}>
      <div className="card_container relative overflow-hidden xs:mb-3 md:mb-6">
        <Link
          href={cardLink}
          passHref
          className="box_radius relative left-0 top-0 inline-block aspect-video w-full cursor-pointer overflow-hidden"
        >
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
        </Link>
        <div className="flex w-full select-none">
          <div className="relative inline-block w-1/2 flex-grow">
            <div className="mt-2 text-sm">
              <Link href={cardLink} passHref>
                <div className="card_title max-h-12 select-text overflow-hidden pt-0 text-base leading-snug text-black">
                  {eventTitle}
                </div>
              </Link>
              <div className="mt-2.5 w-full text-neutral-600">
                <div className="font-semiboldf text-blackf flex w-full items-center overflow-hidden">
                  <p className="flex-shrink-0 text-nowrap">
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
    </Grid>
  )
}

export default EventCard
