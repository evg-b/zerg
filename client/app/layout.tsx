'use client'
import React, { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { ConfirmProvider } from 'material-ui-confirm'
import Link from 'next/link'
import { AppBar, Toolbar, Button } from '@mui/material'
import './styles.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

const RootLayout: FC<any> = ({ children }) => {
  return (
    <html>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <ConfirmProvider>
            <body>
              <AppBar color="transparent" position="static">
                <Toolbar>
                  <Button variant="outlined" component={Link} href={'/'}>
                    Main
                  </Button>
                  <Button variant="outlined" component={Link} href={'/zerg'}>
                    Zerg
                  </Button>
                </Toolbar>
              </AppBar>
              <div id="root">{children}</div>
            </body>
          </ConfirmProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </html>
  )
}

export default RootLayout
