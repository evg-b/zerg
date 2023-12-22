'use client'
import React, { PropsWithChildren, useState } from 'react'
import { RootStyleRegistry } from './RootStyleRegistry'
import MyLayout from './MyLayout'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from 'trpc'
import './styles.css'

const SERVER_PORT = 3100

export default function RootLayout({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:${SERVER_PORT}/trpc`
          // You can pass any HTTP headers you wish here
          // async headers() {
          //   return {
          //     authorization: getAuthCookie()
          //   }
          // }
        })
      ]
    })
  )

  return (
    <html lang="es">
      <head />
      <body>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <RootStyleRegistry>
              <MyLayout>{children}</MyLayout>
            </RootStyleRegistry>
          </QueryClientProvider>
        </trpc.Provider>
      </body>
    </html>
  )
}
