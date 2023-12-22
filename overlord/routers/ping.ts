import { z } from 'zod'
import { t } from '../trpc'

import { ping } from '../core'

export const pingRouter = t.router({
  check: t.procedure.input(z.string()).query(({ input, ctx }) => {
    console.log('Overlord: ping', input)
    return 'pong' + input
  }),
  overlordPing: t.procedure.input(z.string()).query(({ input }) => {
    console.log('Overlord: ping', input)
    const overlordPing = ping()
    return overlordPing
  })
})
