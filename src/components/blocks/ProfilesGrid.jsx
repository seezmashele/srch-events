import { Grid } from '@mui/material'
import SectionTitle from '../misc/SectionTitle'
import ProfileCardGrid from '../cards/ProfileCardGrid'

const ProfilesGrid = ({ events, title = '' }) => (
  <>
    {title && <SectionTitle title={title} />}
    <Grid container spacing={2}>
      {events &&
        events.map((item, index) => (
          <ProfileCardGrid
            data={item}
            key={`profiles-grid${item.slug}${index}`}
            isLastItem={index === events.length - 1}
          />
        ))}
    </Grid>
  </>
)

export default ProfilesGrid
