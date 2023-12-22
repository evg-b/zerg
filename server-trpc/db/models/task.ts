import { Schema, model } from 'mongoose'
import { SubTaskSchema, ISubTask } from './subTask'

export interface ITask {
  _id: string
  url: string
  status: 'done' | 'pause' | 'play'
  count: number
  online: number
  subTasks: ISubTask[]
}

const TaskSchema: Schema = new Schema<ITask>({
  url: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  online: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    required: true,
    default: 'pause'
  },
  subTasks: [SubTaskSchema]
})

export default model<ITask>('task', TaskSchema)
