import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500
    }
  }
})

export default theme
