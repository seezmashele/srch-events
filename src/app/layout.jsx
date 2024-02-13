'use client'

// import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from '../context/AuthContext'
import { DatabaseProvider } from '../context/DatabaseContext'
import { AppProvider } from '../context/AppContext'
import { SettingsProvider } from '../context/SettingsContext'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/app.css'
import theme from '../utils/config/mui'

// export const metadata = {
//   title: 'EventsPlease',
//   description: 'Find and share events',
//   icons: {
//     icon: '/favicon.png',
//     favicon: '/favicon.png'
//   }
// }

const RootLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <AppProvider>
        <SettingsProvider>
          <DatabaseProvider>
            <html lang="en">
              <body>{children}</body>
            </html>
          </DatabaseProvider>
        </SettingsProvider>
      </AppProvider>
    </AuthProvider>
  </ThemeProvider>
)

export default RootLayout
