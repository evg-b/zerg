import * as dbLocal from '../db'
import path from 'path'
import { Worker } from 'worker_threads'
import { v1 } from 'uuid'

type MessageThread = {
  id: number
  status: string
  url: string
  progress: number
}

type MessageCommand = {
  codeCommand: 'play' | 'pause'
}

type CreateTaskType = {
  url: string
  countZergInitial: number
}

type EditTaskType = {
  id: string
  url?: string
  countZergInitial?: number
  status?: 'done' | 'pause' | 'play'
}

export default class Overlord {
  workerScript = path.resolve(__dirname, './ZergThread.js')
  poolZerg = dbLocal.PoolZerg
  poolTask = dbLocal.PoolTask

  /////////////////// STEP ////////////////
  runStep() {
    // TODO:
  }
  /////////////////// STEP ////////////////

  /////////////////// Task ////////////////

  // создание Task
  createTask({ url = '', countZergInitial = 0 }: CreateTaskType) {
    const uuid = v1()
    const newTask: dbLocal.PoolTaskItem = {
      id: uuid,
      url: url,
      countZergInitial: countZergInitial,
      countZergWork: 0,
      countZergDone: 0,
      status: 'pause'
    }
    this.poolTask.createTask(newTask)

    return `Create new Task: ${uuid}`
  }

  // изменение Task
  editTask(editTask: EditTaskType) {
    const { id } = editTask
    this.poolTask.editTask(id, editTask)
    // if (task) {
    //   this.poolTask.set(id, { ...task, ...rest })
    //   return `[Task][edit] id: ${id} done`
    // } else {
    //   return `[Task][edit] id: ${id} not found`
    // }
  }

  // удаление Task
  deleteTask(id: string): string {
    this.poolTask.deleteTask(id)
    return `Delete Task: ${id} ${'result'}`
  }

  // получение данных о всех Task
  getPollTask() {
    return this.poolTask.getAllTask()
  }

  /////////////////// Task ////////////////
  /////////////////// Zerg ////////////////

  getPoolZerg() {
    const PoolInfo: Array<{
      id: number
      status: string
      url: string
      progress: number
    }> = []

    this.poolZerg.forEach(({ id, status, url, progress }) => {
      PoolInfo.push({ id, status, url, progress })
    })
    return JSON.stringify(PoolInfo)
  }

  updatePoolStatistics(msg: MessageThread) {
    const workerState = this.poolZerg.get(msg.id)
    if (workerState) {
      this.poolZerg.set(msg.id, { ...workerState, ...msg })
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

    this.poolZerg.set(worker.threadId, {
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

  // уничтожаем конкретного зерга
  zergStop(id: number) {
    // TODO: переписать эту функцию на async await
    // и обрабатывать все состояния
    const zerg = this.poolZerg.get(id)
    if (zerg) {
      zerg.worker.terminate().finally(() => {
        this.poolZerg.delete(id)
        console.log(`[Zerg][stop] id: ${id} done`)
      })
      return `[Zerg][stop] id: ${id} done`
    } else {
      return `[Zerg][stop] id: ${id} not found`
    }
  }

  zergPause(id: number) {
    const zerg = this.poolZerg.get(id)
    if (zerg) {
      const messageCommand: MessageCommand = { codeCommand: 'pause' }
      zerg.worker.postMessage(messageCommand)
      return `[Zerg][pause] id: ${id} pause?`
    } else {
      return `[Zerg][stop] id: ${id} not found`
    }
  }

  // Запускаем просмотр зерга по id
  zergPlay(id: number) {
    const zerg = this.poolZerg.get(id)
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

  // остановка группы зергов
  // zergPauseAll () {
  //
  // }

  // уничтожаем группы зергов
  // zergStopAll () {
  //
  // }
  /////////////////// Zerg ////////////////
}
