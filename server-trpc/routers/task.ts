import { startSession } from 'mongoose'
import { z } from 'zod'
import { t, trpcOverlord } from '../trpc'
import { Task, ITask, ISubTask } from '../db/models'

export const taskRouter = t.router({
  createTask: t.procedure
    .input(
      z.object({
        url: z.string(),
        count: z.number()
      })
    )
    .mutation(async ({ input }) => {
      // Создаем array SubTasks
      const SubTasks: ISubTask[] = []
      if (input.count) {
        for (let i = 0; i < input.count; i++) {
          SubTasks.push({
            url: input.url,
            status: 'pause',
            timeStart: 'none',
            video_current: 0,
            video_duration: 0,
            video_percent: 0
          })
        }
      }
      // Создаем Task
      const newTask = new Task({
        url: input.url,
        count: input.count,
        subTasks: SubTasks
      })
      await newTask.save()

      return newTask
    }),
  getTaskList: t.procedure.query(async () => {
    const document: ITask[] = await Task.find()
    return document
  }),
  getTask: t.procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async (id) => {
      const document: ITask = await Task.findById(id)

      return document
    }),
  updateTask: t.procedure
    .input(
      z.object({
        id: z.string(),
        url: z.string(),
        count: z.number()
      })
    )
    .mutation(async ({ input: { id, url, count } }) => {
      const updatedDocument = await Task.findByIdAndUpdate(
        id,
        { url, count },
        { new: true }
      )
      return updatedDocument
    }),
  statusChange: t.procedure
    .input(
      z.object({
        id: z.string(),
        status: z.string() // затипизировать под: 'done' | 'pause' | 'play'
      })
    )
    .mutation(async ({ input: { id, status } }) => {
      // 1) стартуем транзакцию
      // Создание сессии транзакции
      const session = await startSession()
      session.startTransaction()

      // 5) если все ок то отдаем объект
      try {
        // 2) Изменяем статус и возвращаем новый объект
        const updatedDocument: ITask = await Task.findByIdAndUpdate(id, {
          status
        })
        console.log('updatedDocument:', updatedDocument)
        // 3) отправляем этот объект в Overlord и там пытаемся запустить задачу

        if (status === 'play') {
          trpcOverlord.task.start.query({ id: id })
        }
        if (status === 'pause') {
          trpcOverlord.task.stop.query({ id: id })
        }

        // Завершение транзакции
        await session.commitTransaction()

        // return updatedDocument
      } catch (e) {
        // 4) если ошибка, то отменяем транзакцию и возвращаем ошибку
        await session.abortTransaction()
      } finally {
        await session.endSession()
      }
      // trpcOverlord.task.start.query({ id: id })
    }),
  delete: t.procedure.input(z.string()).mutation(async ({ input }) => {
    const deletedDocument = await Task.findByIdAndDelete(input)
    return deletedDocument
  })
})
