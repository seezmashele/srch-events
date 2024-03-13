import { Grid } from '@mui/material'
import SectionTitle from '../misc/SectionTitle'
import EventCardSmall from '../cards/EventCardSmall'
import EventCardGridLoader from '../loaders/EventCardGridLoader'
import { placeholderArray24 } from '../../utils/constants/placeholders'

// check if data is placeholder or fetched then have an EventsPlaceholderBlock
// so you aren't checking if each item is a placeholder 1 by 1

const EventsBlock = ({ events, title = '' }) => {
  const usePlaceholders = events && events[0] && events[0].placeholder

  return (
    <>
      {title && <SectionTitle title={title} />}
      <Grid container spacing={2}>
        {usePlaceholders
          ? placeholderArray24.map((item, index) => (
              <EventCardGridLoader key={`events-block-loader${index}`} />
            ))
          : events &&
            events.map((item, index) => (
              <EventCardSmall
                data={item}
                key={`events-block${item.slug}${index}`}
              />
            ))}
      </Grid>
    </>
  )
}

export default EventsBlock
