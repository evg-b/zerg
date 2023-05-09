import { Worker } from 'worker_threads'
import { TaskItem, StepItem } from '@models/dto'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

// Configure lowdb to write to JSONFile
type DBtype = {
  tasks: TaskItem[]
  steps: StepItem[]
}

const adapter = new FileSync<DBtype>('./db.json')
const db = low(adapter)

db.defaults({ tasks: [], steps: [] }).write()

///////////////////////////// ZERG /////////////////////////////
type PoolZergItem = {
  zergId: number
  taskId: string
  worker: Worker
  status: string
  rootUrl: string
  url: string
  progress: number
}

type PoolZergType = Map<number, PoolZergItem>

export const PoolZerg: PoolZergType = new Map()
///////////////////////////// ZERG /////////////////////////////
///////////////////////////// TAsk /////////////////////////////
type EditTaskType = {
  taskId: string
  url?: string
  countZergInitial?: number
  status?: 'done' | 'pause' | 'play'
}
// type PoolTaskType = Map<number, PoolTaskItem>
//
export const PoolTask = {
  createTask: (newTask: TaskItem) => {
    db.get('tasks').push(newTask).write()
  },
  getTask: (taskId: string) => {
    return db.get('tasks').find({ taskId: taskId }).value()
  },
  getAllTask: () => {
    return db.get('tasks').value()
  },
  editTask: (taskId: string, editTask: EditTaskType) => {
    db.get('tasks')
      .find({ taskId: taskId })
      .assign({ ...editTask })
      .write()
  },
  deleteTask: (taskId: string) => {
    db.get('tasks').remove({ taskId: taskId }).write()
  }
}

///////////////////////////// TAsk /////////////////////////////
///////////////////////////// STEP /////////////////////////////
export const PoolStep = {
  addStepArray: (newStep: StepItem[]) => {
    db.get('steps')
      .push(...newStep)
      .write()
  },
  getStep: (stepId: string) => {
    return db.get('steps').find({ stepId: stepId }).value()
  },
  getStepByTaskId: (taskId: string): StepItem[] => {
    return db.get('steps').filter({ taskId: taskId }).value()
  },
  getAllStep: () => {
    return db.get('steps').value()
  },
  // editStep: (id: string, newStep: PoolStepItem) => {
  //   db.get('steps')
  //     .find({ id: id })
  //     .assign({ ...newStep })
  //     .write()
  // },
  deleteStep: (stepId: string) => {
    return db
      .get('steps')
      .remove({ stepId: stepId })
      .write()
      .then(() => ({ status: 'ok' }))
      .catch(() => ({ status: 'error' }))
  }
}
///////////////////////////// STEP /////////////////////////////
