import { initTRPC } from '@trpc/server'
import { createTRPCProxyClient, httpLink } from '@trpc/client'

import { OverlordRouter } from 'overlord/server'

export const t = initTRPC.create()

const OVERLORD_PORT = 3200
const url = `http://localhost:${OVERLORD_PORT}/trpc`

export const trpcOverlord = createTRPCProxyClient<OverlordRouter>({
  links: [
    httpLink({
      url
    })
  ],
  transformer: undefined
})
