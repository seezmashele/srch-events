'use client'

// import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from '../context/AuthContext'
import { AppProvider } from '../context/AppContext'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/app.css'
import theme from '../utils/config/mui'
import ReactQueryClientProvider from '../components/providers/ReactQueryClientProvider'

// export const metadata = {
//   title: 'EventsPlease',
//   description: 'Find and share events',
//   icons: {
//     icon: '/favicon.png',
//     favicon: '/favicon.png'
//   }
// }

const RootLayout = ({ children }) => (
  <html lang="en">
    <ThemeProvider theme={theme}>
      <ReactQueryClientProvider>
        <AuthProvider>
          <AppProvider>
            <body>{children}</body>
          </AppProvider>
        </AuthProvider>
      </ReactQueryClientProvider>
    </ThemeProvider>
  </html>
)

export default RootLayout
