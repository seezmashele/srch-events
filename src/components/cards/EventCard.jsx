import Link from 'next/link'
import { Grid } from '@mui/material'
import { useState } from 'react'
// import { getPostAge } from "../../utils/helpers/time"

const EventCard = ({ data }) => {
  const cardTitle = data.title
  const cardImage = data.thumbnailImage
  const cardLink = data.slug ? `/event/${data.slug}` : '/'
  const cardStartingDate = data.eventStartingDate || ''
  const authorProfileLink = data.authorUsername
    ? `/profile/${data.authorUsername}`
    : '/'
  const cardAuthor = data.authorDisplayName ? data.authorDisplayName : ''
  // const upvotes = data.upvotes || ''
  const [isLoading, setIsLoading] = useState(true)
  const startingPrice = null

  return (
    <Grid item xs={12} mobile={6} sm={6} md={4} lg={4}>
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
            src={cardImage}
            alt={cardTitle}
          />
        </Link>
        <div className="flex w-full select-none">
          <div className="relative inline-block w-1/2 flex-grow">
            <div className="mt-2 text-sm">
              <Link href={cardLink} passHref>
                <div className="card_title max-h-12 select-text overflow-hidden pt-0 text-lg leading-snug text-black">
                  {cardTitle}
                </div>
              </Link>
              <div className="mt-2.5 w-full text-neutral-600">
                <div>{cardStartingDate}</div>
                <div className="flex items-center">
                  <Link
                    href={authorProfileLink}
                    passHref
                    className="cursor-pointer hover:underline"
                  >
                    {cardAuthor}
                  </Link>
                  {/* <div className="mx-1.5 mt-0.5 h-0.5 w-0.5 rounded-full bg-neutral-500" />
                  <p>{upvotes} upvotes</p> */}
                </div>
              </div>
              {startingPrice && <div className="mt-0.5f font-medium">Free</div>}
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default EventCard
