'use client'

// import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from '../context/AuthContext'
import { DatabaseProvider } from '../context/DatabaseContext'
import { AppProvider } from '../context/AppContext'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/app.css'
import theme from '../utils/config/mui'

const queryClient = new QueryClient()

// export const metadata = {
//   title: 'EventsPlease',
//   description: 'Find and share events',
//   icons: {
//     icon: '/favicon.png',
//     favicon: '/favicon.png'
//   }
// }

const RootLayout = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <DatabaseProvider>
            <html lang="en">
              <body>{children}</body>
            </html>
          </DatabaseProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default RootLayout
