'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Button } from '@mui/material'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const RootLayout: FC<any> = ({ children }) => {
  return (
    <html lang="en">
        <head />
        <body>
        <QueryClientProvider client={queryClient}>
        <AppBar color='transparent' position='static'>
        <Toolbar>
            <Button variant='outlined' component={Link} href={'/'}>Main</Button>
            <Button variant='outlined' component={Link} href={'/zerg'}>Zerg</Button>
        </Toolbar>
        </AppBar>
            {children}
        </QueryClientProvider>
        </body>
    </html>
  )
}

export default RootLayout
