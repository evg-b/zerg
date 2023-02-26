import { Worker } from 'worker_threads'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

// Configure lowdb to write to JSONFile
type DBtype = {
  tasks: PoolTaskItem[]
}

const adapter = new FileSync<DBtype>('./db.json')
const db = low(adapter)

db.defaults({ tasks: [] }).write()

// await db.read()

///////////////////////////// ZERG /////////////////////////////
type PoolZergItem = {
  id: number
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
export type PoolTaskItem = {
  id: string
  url: string
  countZergInitial: number
  countZergDone: number
  countZergWork: number
  status: 'done' | 'pause' | 'play'
}
type EditTaskType = {
  id: string
  url?: string
  countZergInitial?: number
  status?: 'done' | 'pause' | 'play'
}
// type PoolTaskType = Map<number, PoolTaskItem>
//
export const PoolTask = {
  createTask: (newTask: PoolTaskItem) => {
    db.get('tasks').push(newTask).write()
  },
  getTask: (id: string) => {
    return db.get('tasks').find({ id: id }).value()
  },
  getAllTask: () => {
    return db.get('tasks').value()
  },
  editTask: (id: string, editTask: EditTaskType) => {
    db.get('tasks')
      .find({ id: id })
      .assign({ ...editTask })
      .write()
  },
  deleteTask: (id: string) => {
    // db.data?.tasks.
    db.get('tasks').remove({ id: id }).write()
  }
}

///////////////////////////// TAsk /////////////////////////////
///////////////////////////// STEP /////////////////////////////
type Step = {}
type Scheme = {}
///////////////////////////// STEP /////////////////////////////
