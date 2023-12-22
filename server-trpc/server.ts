import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers'
import connectDB from './db/connectDB'

// import { trpcOverlord } from './trpc'

const SERVER_PORT = 3100

const app = express()

app.use(cors())

app.use(express.json())

app.use('/trpc', createExpressMiddleware({ router: appRouter }))

app.listen(SERVER_PORT, () => {
  console.log(`[SERVER-TRPC] Server is listening on port ${SERVER_PORT}`)

  // connect mongoDB
  connectDB()

  // trpcOverlord.ping.check.query('test-test').then((resPing) => {
  //   console.log('[SERVER-TRPC] resPing:', resPing)
  // })
  // trpcOverlord.ping.overlordPing.query('blabla').then((resOverlordPing) => {
  //   console.log('[SERVER-TRPC] resOverlordPing:', resOverlordPing)
  // })
})

export type AppRouter = typeof appRouter
