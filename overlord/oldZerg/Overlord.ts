import * as dbLocal from '../../server/src/db'
import path from 'path'
import { TaskItem, StepItem, TaskEditReq } from '@models/dto'
import { Worker } from 'worker_threads'
import { v1 } from 'uuid'

/*
  Данная функция triangularSum принимает массив чисел numbers и возвращает массив,
  элементы которого являются суммой накопленной суммы предыдущих элементов массива numbers.
*/
function triangularSum(numbers: number[]) {
  let prevSum = 0
  return numbers.map((val) => {
    prevSum += val
    return prevSum
  })
}
/*
  Данная функция splitNumber принимает два числовых аргумента: number - число, которое требуется разбить,
  и parts - количество частей, на которые требуется разбить number.
  Внутри функции сначала вычисляется частное и остаток от деления number на parts с помощью операторов Math.floor и %.
  Затем создаётся новый массив result размера parts, который заполняется значением quotient, используя метод fill.
  Далее в цикле for увеличивается первые remainder элементов массива result на единицу, чтобы учесть оставшийся остаток.
  Наконец, функция возвращает полученный массив result, который содержит parts элементов, сумма которых равна number.
*/
function splitNumber(number: number, parts: number): number[] {
  const quotient = Math.floor(number / parts)
  const remainder = number % parts

  const result = new Array(parts).fill(quotient)
  for (let i = 0; i < remainder; i++) {
    result[i]++
  }

  return result
}

function generationSteps(number: number, parts: number) {
  const stepResult = splitNumber(number, parts)
  const timeResult = triangularSum(splitNumber(23, parts))

  return stepResult.map((value, index) => {
    return {
      time: timeResult[index],
      count: value
    }
  })
}

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

type CreateZergType = {
  taskId: string
  targetUrl: string
}

export default class Overlord {
  workerScript = path.resolve(__dirname, './ZergThread.js')
  poolZerg = dbLocal.PoolZerg
  poolTask = dbLocal.PoolTask
  poolStep = dbLocal.PoolStep

  /////////////////// STEP ////////////////sdf
  runStep(stepId: string) {
    const { taskId, countZergInitial, status } =
      dbLocal.PoolStep.getStep(stepId)

    const { url } = dbLocal.PoolTask.getTask(taskId)
    if (status === 'wait') {
      for (let i = 0; i < countZergInitial; i++) {
        this.zergCreate({ taskId: taskId, targetUrl: url })
      }
    }
    // 1 - Запускаем зергов
    // 2 - меняем статус шага на progress
  }
  generationSteps(newTask: TaskItem): StepItem[] {
    const parts = 4
    const result = generationSteps(newTask.countZergInitial, parts).map(
      ({ time, count }) => {
        return {
          stepId: v1(),
          taskId: newTask.taskId,
          timeStart: String(time),
          countZergInitial: count,
          countZergWork: 0,
          countZergDone: 0,
          status: 'wait'
        } as StepItem
      }
    )
    console.log('generationSteps:', result) // [3, 7, 5, 5]
    return result
  }
  /////////////////// STEP ////////////////

  /////////////////// Task ////////////////

  // создание Task
  createTask({ url = '', countZergInitial = 0 }: CreateTaskType) {
    const uuid = v1()
    const newTask: TaskItem = {
      taskId: uuid,
      url: url,
      countZergInitial: countZergInitial,
      countZergWork: 0,
      countZergDone: 0,
      status: 'pause'
    }
    this.poolTask.createTask(newTask)
    const steps = this.generationSteps(newTask)
    this.poolStep.addStepArray(steps)

    return `Create new Task: ${uuid}`
  }

  // изменение Task
  editTask(editTask: TaskEditReq) {
    const { taskId } = editTask
    this.poolTask.editTask(taskId, editTask)
    // if (task) {
    //   this.poolTask.set(id, { ...task, ...rest })
    //   return `[Task][edit] id: ${id} done`
    // } else {
    //   return `[Task][edit] id: ${id} not found`
    // }
  }

  // удаление Task
  async deleteTask(id: string) {
    await this.poolTask.deleteTask(id)
    await this.poolStep.deleteStepByTaskId(id)
    return `Delete Task: ${id} and Steps`
  }

  // получение данных о всех Task
  getPollTask() {
    return this.poolTask.getAllTask()
  }

  /////////////////// Task ////////////////
  /////////////////// Zerg ////////////////

  getPoolZerg() {
    const PoolInfo: Array<{
      zergId: number
      status: string
      url: string
      progress: number
    }> = []

    this.poolZerg.forEach(({ zergId, status, url, progress }) => {
      PoolInfo.push({ zergId, status, url, progress })
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
  zergCreate({ taskId, targetUrl }: CreateZergType) {
    // console.log('[Overlord] workerScript:', this.workerScript)
    const worker = new Worker(this.workerScript, { workerData: { targetUrl } })
    console.log('[Overlord] worker id:', worker.threadId)

    this.poolZerg.set(worker.threadId, {
      zergId: worker.threadId,
      taskId: taskId,
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
  zergStop(zergId: number) {
    // TODO: переписать эту функцию на async await
    // и обрабатывать все состояния
    const zerg = this.poolZerg.get(zergId)
    if (zerg) {
      zerg.worker.terminate().finally(() => {
        this.poolZerg.delete(zergId)
        console.log(`[Zerg][stop] zergId: ${zergId} done`)
      })
      return `[Zerg][stop] zergId: ${zergId} done`
    } else {
      return `[Zerg][stop] zergId: ${zergId} not found`
    }
  }

  zergPause(zergId: number) {
    const zerg = this.poolZerg.get(zergId)
    if (zerg) {
      const messageCommand: MessageCommand = { codeCommand: 'pause' }
      zerg.worker.postMessage(messageCommand)
      return `[Zerg][pause] zergId: ${zergId} pause?`
    } else {
      return `[Zerg][stop] zergId: ${zergId} not found`
    }
  }

  // Запускаем просмотр зерга по id
  zergPlay(zergId: number) {
    const zerg = this.poolZerg.get(zergId)
    if (zerg) {
      const messageCommand: MessageCommand = { codeCommand: 'play' }
      zerg.worker.postMessage(messageCommand)
      return `[Zerg][pause] zergId: ${zergId} play?`
    } else {
      return `[Zerg][stop] zergId: ${zergId} not found`
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
