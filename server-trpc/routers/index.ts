import { t } from '../trpc'
import { taskRouter } from './task'

export const appRouter = t.router({
  tasks: taskRouter
})
