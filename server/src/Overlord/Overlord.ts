import * as dbLocal from '../db'
import path from 'path'
import { Worker } from 'worker_threads'

console.log('dbLocal:', dbLocal)

const dirname = path.resolve(__dirname, './ZergThread.js')
console.log('directory-name 👉️', dirname)

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

  // запуск одного конкретного зерга PROFILE
  // runZerg () {
  //   /*
  //       * workerData - будет содержать Profile
  //       * */
  //   const worker = new Worker(this.workerScript, { workerData: { } })
  //   console.log('worker id:', worker.threadId)
  //
  //   dbLocal.PoolZerg.set(worker.threadId, worker)
  //   worker.on('message', (msg) => console.log('worker msg:', msg))
  //   worker.on('error', (error) => console.log('worker error:', error))
  //   worker.on('exit', () => console.log('worker exit:'))
  // }

  // запуск одного любого зерга ANY
  zergCreate () {
    // TODO: создаем зерга
    console.log('workerScript:', this.workerScript)
    const worker = new Worker(this.workerScript, { workerData: { } })
    console.log('worker id:', worker.threadId)

    this.pool.set(worker.threadId, worker)
    worker.on('message', (msg) => console.log('worker msg:', msg))
    worker.on('error', (error) => console.log('worker error:', error))
    worker.on('exit', (exitCode) => console.log('worker exitCode:', exitCode))

    return { id: worker.threadId, error: 'error text' }
  }
  // запуск группы зергов по циклу

  // остановка конкретного зерга

  // остановка группы зергов
}
