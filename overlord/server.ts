import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { OverlordRouter } from './routers'

import { createContext } from './core'

import connectDB from 'server-trpc/db/connectDB'

const OVERLORD_PORT = 3200

const app = express()

app.use(express.json())

app.use(
  '/trpc',
  createExpressMiddleware({ router: OverlordRouter, createContext })
)

app.listen(OVERLORD_PORT, () => {
  console.log(`[OVERLORD] Server is listening on port ${OVERLORD_PORT}`)

  // connect mongoDB
  connectDB()
})

export type OverlordRouter = typeof OverlordRouter
