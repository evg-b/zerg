import * as dbLocal from '../db'
import path from 'path'
import { Worker } from 'worker_threads'

type MessageThread = {
  id: number
  status: string
  url: string
  progress: number
}

type MessageCommand = {
  codeCommand: 'play' | 'pause'
}

export default class Overlord {
  workerScript = path.resolve(__dirname, './ZergThread.js')
  pool = dbLocal.PoolZerg

  // get Tasks() {
  //   return dbLocal.Tasks
  // }

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

  getPool() {
    const PoolInfo: Array<{
      id: number
      status: string
      url: string
      progress: number
    }> = []

    this.pool.forEach(({ id, status, url, progress }) => {
      PoolInfo.push({ id, status, url, progress })
    })
    return JSON.stringify(PoolInfo)
  }

  updatePoolStatistics(msg: MessageThread) {
    const workerState = this.pool.get(msg.id)
    if (workerState) {
      this.pool.set(msg.id, { ...workerState, ...msg })
    } else {
      // SOS: если зерга нет в poll, то как тогда он существует?
      // Это потеряшка, придумаю что с ним делать позже
      console.log('SOS потеряшка!!!')
    }
  }

  // запуск одного любого зерга ANY
  zergCreate(targetUrl: string) {
    // TODO: создаем зерга
    console.log('[Overlord] workerScript:', this.workerScript)
    const worker = new Worker(this.workerScript, { workerData: { targetUrl } })
    console.log('[Overlord] worker id:', worker.threadId)

    this.pool.set(worker.threadId, {
      id: worker.threadId,
      rootUrl: targetUrl,
      url: '',
      status: '',
      progress: 0,
      worker
    })
    worker.on('message', this.updatePoolStatistics.bind(this))
    worker.on('error', (error) =>
      console.log('[Overlord] worker error:', error)
    )
    worker.on('exit', (exitCode) =>
      console.log('[Overlord] worker exitCode:', exitCode)
    )

    return { id: worker.threadId, error: 'error text' }
  }
  // запуск группы зергов по циклу

  // уничтожаем конкретного зерга
  zergStop(id: number) {
    // TODO: переписать эту функцию на async await
    // и обрабатывать все состояния
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

  // уничтожаем группы зергов
  // zergStopAll () {
  //
  // }

  // остановка группы зергов
  zergPause(id: number) {
    const zerg = this.pool.get(id)
    if (zerg) {
      const messageCommand: MessageCommand = { codeCommand: 'pause' }
      zerg.worker.postMessage(messageCommand)
      return `[Zerg][pause] id: ${id} pause?`
    } else {
      return `[Zerg][stop] id: ${id} not found`
    }
  }

  // остановка группы зергов
  // zergPauseAll () {
  //
  // }

  // Запускаем просмотр группы зергов
  zergPlay(id: number) {
    const zerg = this.pool.get(id)
    if (zerg) {
      const messageCommand: MessageCommand = { codeCommand: 'play' }
      zerg.worker.postMessage(messageCommand)
      return `[Zerg][pause] id: ${id} play?`
    } else {
      return `[Zerg][stop] id: ${id} not found`
    }
  }

  // Запускаем просмотр группы зергов
  // zergPlayAll () {
  //
  // }
}
