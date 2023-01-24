import * as dbLocal from '../db'
import path from 'path'
import { Worker } from 'worker_threads'

export default class Overlord {
  idTask = 0
  workerScript = path.resolve(__dirname, './ZergThread.js')
  pool = dbLocal.PoolZerg

  get Tasks () {
    return dbLocal.Tasks
  }

  // создание Task
  // createTask ({ name, count, url }: dbLocal.CreateTask) {
  //   this.idTask = this.idTask + 1
  //
  //   const newTask: dbLocal.Task = {
  //     name,
  //     count: count || 0,
  //     url,
  //     id: this.idTask,
  //     status: 'stop',
  //     progress: `0/${count}`
  //   }
  //   dbLocal.Tasks.push(newTask)
  // }

  // изменение Task
  // changeTask ({}: dbLocal.Task) {
  //
  // }

  // удаление Task
  // deleteTask (id: dbLocal.Task['id']): boolean {
  //   console.log('Overlord[deleteTask]:', id)
  //   return true
  // }

  /// //////////////// Zerg ////////////////

  getPool () {
    const PoolInfo: Array<{ id: number }> = []

    this.pool.forEach(val => {
      PoolInfo.push({ id: val.id })
    })
    return JSON.stringify(PoolInfo)
  }

  // запуск одного любого зерга ANY
  zergCreate (targetUrl: string) {
    // TODO: создаем зерга
    console.log('[Overlord] workerScript:', this.workerScript)
    const worker = new Worker(this.workerScript, { workerData: { targetUrl } })
    console.log('[Overlord] worker id:', worker.threadId)

    this.pool.set(worker.threadId, { id: worker.threadId, worker })
    worker.on('message', (msg) => console.log('[Overlord] worker msg:', msg))
    worker.on('error', (error) => console.log('[Overlord] worker error:', error))
    worker.on('exit', (exitCode) => console.log('[Overlord] worker exitCode:', exitCode))

    return { id: worker.threadId, error: 'error text' }
  }
  // запуск группы зергов по циклу

  // остановка конкретного зерга
  zergStop (id: number) {
    // TODO: переписать эту функцию на async await
    //  и обрабатывать все состояния
    const zerg = this.pool.get(id)
    if (zerg) {
      zerg.worker.terminate().finally(() => {
        this.pool.delete(id)
        console.log(`[Zerg][stop] id: ${id} done`)
      })
      return `[Zerg][stop] id: ${id} done`
    } else {
      return `[Zerg][stop] id: ${id} not found`
    }
  }
  // остановка группы зергов
}
