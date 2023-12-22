import { z } from 'zod'
import { t } from '../trpc'
import { Task, ITask } from 'server-trpc/db/models'

export const taskRouter = t.router({
  start: t.procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      console.log('[Router][TASK] Start id:', id)
      const task: ITask = await Task.findById(id)

      ctx.Overlord.task.start(task)
    }),
  stop: t.procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      console.log('[Router][TASK] Stop id:', id)
      ctx.Overlord.task.stop(id)
    })
})
