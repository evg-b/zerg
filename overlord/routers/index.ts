import { t } from '../trpc'
import { pingRouter } from './ping'
import { taskRouter } from './task'

export const OverlordRouter = t.router({
  ping: pingRouter,
  task: taskRouter
})
