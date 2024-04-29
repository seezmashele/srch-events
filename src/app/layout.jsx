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
//   title: 'Srch Events',
//   description: 'Find and share events',
//   icons: {
//     icon: '/favicon.png',
//     favicon: '/favicon.png'
//   }
// }

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ThemeProvider theme={theme}>
        <ReactQueryClientProvider>
          <AuthProvider>
            <AppProvider>{children}</AppProvider>
          </AuthProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
