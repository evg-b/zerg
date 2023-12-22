import { Worker } from 'worker_threads'
import path from 'path'
import { SubTaskOnline, SubTaskUpdate, SubTaskDone, SubTaskPause } from '../db'
import type { WorkerDataType, WorkerMessageType } from './thread.types'

export interface IPool {
  addPool(task_id: string, subTask_id: string, targetUrl: string): void
  stop(_id: string): void
}

export class Pool implements IPool {
  pool = new Map()
  subscriptions(worker: Worker, { task_id, subTask_id }: WorkerDataType) {
    // тут подписка на thread
    worker.on('online', () => {
      console.log('[WORKER][Online] online', worker.threadId)
      // 1 - online++ в Task
      // 2 - status=play в SubTask
      SubTaskOnline(task_id, subTask_id)
        .then(() => {
          console.log('SubTaskOnline ok')
        })
        .catch((error) => {
          console.log('SubTaskOnline error:', error)
        })
    })

    worker.on('message', (message: WorkerMessageType) => {
      console.log('Получено сообщение от воркера:', message)
      // 1 - обогощать SubTask current
      if (message.type == 'init') {
        const video_duration = message.video_duration
        SubTaskUpdate(subTask_id, { video_duration })
          .then(() => {
            console.log('SubTaskUpdate ok')
          })
          .catch((error) => {
            console.log('SubTaskUpdate error:', error)
          })
      }
      if (message.type == 'new_currentTime') {
        const video_current = message.video_current
        const video_percent = message.video_percent
        SubTaskUpdate(subTask_id, { video_current, video_percent })
          .then(() => {
            console.log('SubTaskUpdate ok')
          })
          .catch((error) => {
            console.log('SubTaskUpdate error:', error)
          })
      }
    })

    worker.on('error', (err) => {
      console.error('В воркере произошла ошибка:', err)
      // TODO: сделать отметку в BD
      // 1 - online-- в Task
      // 2 - status=pause в SubTask
      SubTaskPause(task_id, subTask_id).finally(() =>
        this.pool.delete(subTask_id)
      )
    })

    worker.on('messageerror', (err) => {
      console.error('Ошибка десериализации сообщения:', err)
      // TODO: сделать отметку в BD
      // 1 - online-- в Task
      // 2 - status=pause в SubTask
      SubTaskPause(task_id, subTask_id).finally(() =>
        this.pool.delete(subTask_id)
      )
    })

    worker.on('exit', (code) => {
      console.log(`Воркер завершился с кодом ${code}`)
      // TODO: сделать отметку в BD
      // 1 - online-- в Task
      // 2 - status=done or pause в SubTask
      // 3 - count++
      SubTaskDone(task_id, subTask_id).finally(() =>
        this.pool.delete(subTask_id)
      )
    })
  }
  async addPool(task_id: string, subTask_id: string, targetUrl: string) {
    const WorkData: WorkerDataType = { targetUrl, task_id, subTask_id }
    const worker = new Worker(path.resolve(__dirname, './thread.ts'), {
      workerData: WorkData
    })

    const threadId = worker.threadId
    this.pool.set(subTask_id, {
      threadId: threadId,
      worker
    })

    console.log('[POOL] addPool: threadId:', threadId)

    this.subscriptions(worker, WorkData)
  }
  async stop(_id: string) {
    // TODO: прикрутить транзакцию
    // Останавливается все SubTasks
    // const zerg: IZerg = await Zerg.findOne({ task_id: _id })
    // const { worker } = this.pool.get(zerg.zerg_id) // типизация Pool
    // await worker.terminate()
    //
    // try {
    //   const doc = await Zerg.findByIdAndDelete(zerg._id)
    //   console.log('Удаленная запись: ', doc)
    // } catch (err) {
    //   console.error(err)
    // }
  }
  //
}
