import { Grid } from '@mui/material'

const EventCardGridLoader = () => (
  <Grid item xs={12} mobile={6} sm={6} md={4} lg={4}>
    <div className="mb-6 w-full flex-shrink animate-pulse">
      <div className="card_radius loader_bg_color relative left-0 top-0 block aspect-video w-full cursor-pointer overflow-hidden" />
      <div className="mt-3 flex items-center text-sm">
        {/* <div className="loader_bg_color mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-white" /> */}
        <span className="loader_bg_color box_radius h-4 w-72 font-semibold" />
      </div>
      <div className="loader_bg_color box_radius mt-2.5 h-3.5 w-full" />
      <div className="loader_bg_color box_radius mt-2.5 h-3.5 w-full" />
    </div>
  </Grid>
)

export default EventCardGridLoader
